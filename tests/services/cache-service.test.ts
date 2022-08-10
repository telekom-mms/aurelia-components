import {CacheService} from "../../src/services/cache-service";
import {toMilliseconds} from "../../src/utils/time";

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

describe("CacheService", () => {
  test(".getForKeyWithLoadingFunction loading non-existing key creates new Entry", () => {
    const cacheService = new CacheService() // empty
    const key = "someKey"
    const promise = Promise.resolve({})

    expect(cacheService.cacheKeys).not.toContain(key) // Sanity Check
    const result = cacheService.getForKeyWithLoadingFunction(key, () => promise)

    expect(result).toStrictEqual(promise)
    expect(cacheService.cacheKeys).toContain(key)
  })

  test(".getForKeyWithLoadingFunction loading existing key for dead Entry creates new Entry", async () => {
    const cacheService = new CacheService() // empty
    const key = "someKey"
    const promiseA = Promise.resolve({})
    const promiseB = Promise.resolve("Eyo!")

    const resultA = await cacheService.getForKeyWithLoadingFunction(key, () => promiseA);
    cacheService.invalidate([key]);
    const resultB = await cacheService.getForKeyWithLoadingFunction(key, () => promiseB);

    expect(resultA).not.toBe(resultB);
  })

  test("Check loading function call count", async () => {

    const cacheService = new CacheService() // empty
    const key = "someKey";

    let callCount = 0;

    const loadingFunction = () => {
      callCount++;
      return Promise.resolve("Katze");
    }

    let result = await cacheService.getForKeyWithLoadingFunction(key, loadingFunction, {ms: 10});
    expect(result).toBe("Katze");
    expect(callCount).toBe(1);
    expect(cacheService.outdatedKeys.length).toBe(0);

    result = await cacheService.getForKeyWithLoadingFunction(key, loadingFunction, {ms: 10});
    expect(result).toBe("Katze");
    expect(callCount).toBe(1);
    expect(cacheService.outdatedKeys.length).toBe(0);

    await sleep(11);
    expect(cacheService.outdatedKeys).toContain(key);

    result = await cacheService.getForKeyWithLoadingFunction(key, loadingFunction);
    expect(result).toBe("Katze");
    expect(callCount).toBe(2);

  })

  test("Call invalidates other", async () => {

    const cacheService = new CacheService();
    cacheService.setDefaultCacheTtl(0);

    const key = "someKey";

    const fastLoadingFunction = () => {
      return Promise.resolve("Hase");
    }

    const slowLoadingFunction = async () => {
      await sleep(10);
      return Promise.resolve("Schnecke");
    }

    const resultA = cacheService.getForKeyWithLoadingFunction(key, slowLoadingFunction);
    await sleep(1);
    const resultB = cacheService.getForKeyWithLoadingFunction(key, fastLoadingFunction);
    expect(resultB).not.toBe(resultA);

    await resultA.then(value => expect(value).toBe("Schnecke"));
    await resultB.then(value => expect(value).toBe("Hase"));
  })

  test("Value arriving after key timed out will not crash", async () => {
    const cacheService = new CacheService()
    const key = "someKey"
    // each must be bigger than the previous one
    const ttl = {ms: 10}
    const cleanupTime = {ms: 20}
    const loadingTime = {ms: 30}

    const slowLoadingFunction = async () => {
      await sleep(toMilliseconds(loadingTime));
      return Promise.resolve("Schnecke");
    }

    const result = cacheService.getForKeyWithLoadingFunction(key, slowLoadingFunction, ttl)
    const handle = result.then(_ => {}) // let result begin to resolve

    await sleep(toMilliseconds(cleanupTime))
    cacheService.invalidateOutdated()

    await handle // wait for result to resolve: no code execution => no exception
    // will fail if getForKeyWithLoadingFunction throws
  }, 1000000) // exaggeratedly high timeout so we can use breakpoints without breaking a sweat

  test("Dead entries do not supplant living ones", async () => {
    const cacheService = new CacheService()
    const key = "someKey"
    // Each must be greater than the previous one. Script may run too slowly for the math to work out for two-digit values.
    const ttl = {ms: 100}
    const cleanupTime = {ms: 150}
    const loadingTime = {ms: 200}
    // afterLoadingTimeButBeforeTtlEnds must be (quite considerably) less than ttl.
    const afterLoadingTimeButBeforeTtlEnds = {ms: 1 + loadingTime.ms - cleanupTime.ms}
    expect(afterLoadingTimeButBeforeTtlEnds.ms).toBeLessThan(ttl.ms) // Sanity Check

    let counter = 0
    const fastLoadingFunction = () => Promise.resolve(counter++)
    const slowLoadingFunction = async () => {
      const result = counter++ // Copy-by-Value before another call can change counter
      await sleep(toMilliseconds(loadingTime))
      return Promise.resolve(result)
    }

    const actualResults = new Array<number>()
    cacheService.getForKeyWithLoadingFunction(key, slowLoadingFunction, ttl)
        .then(result => actualResults[0] = result)

    await sleep(toMilliseconds(cleanupTime))
    cacheService.invalidateOutdated() // entry of slowLoadingFunction removed

    // This will find no entry and thence call fastLoadingFunction.
    cacheService.getForKeyWithLoadingFunction(key, fastLoadingFunction, ttl)
        .then(result => actualResults[1] = result)

    // This will find the valid entry 1 and not call fastLoadingFunction again.
    cacheService.getForKeyWithLoadingFunction(key, fastLoadingFunction, ttl)
        .then(result => actualResults[2] = result)
    expect(actualResults[2]).toBe(actualResults[1]) // Sanity Check: Call 2 did not happen because entry 1 is still valid.

    // After this wait, entry 1 is still valid - but slowLoadingFunction now resolves and would replace it with its own, long dead one.
    await sleep(toMilliseconds(afterLoadingTimeButBeforeTtlEnds))
    expect(cacheService.outdatedKeys).toHaveLength(0) // Sanity Check: Only the living entry 1 should exist at this point.

    // This would find the zombie entry of slowLoadingFunction instead of the valid entry of fastLoadingFunction.
    const lastCall = cacheService.getForKeyWithLoadingFunction(key, fastLoadingFunction, ttl)
        .then(result => actualResults[3] = result)
    await lastCall // extra line so IDEA breakpoint on previous line works normally

    // Sanity Check: no past value read in the future
    let previousResult = -1
    for (const result of actualResults) {
      expect(result).toBeGreaterThanOrEqual(previousResult)
      previousResult = result
    }
    // Call 3 would have happened originally because entry 1 was supplanted by zombie entry 0.
    expect(actualResults[3]).toBe(actualResults[1])
  }, 1000000) // exaggeratedly high timeout so we can use breakpoints without breaking a sweat
})
