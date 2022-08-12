import {CacheService} from "../../src/services/cache-service";
import {sleep} from "../../src/utils/time";

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

    await sleep({ms: 11});
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
      await sleep({ms: 10});
      return Promise.resolve("Schnecke");
    }

    const resultA = cacheService.getForKeyWithLoadingFunction(key, slowLoadingFunction);
    await sleep({ms: 1});
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
      await sleep(loadingTime);
      return Promise.resolve("Schnecke");
    }

    const resultA = cacheService.getForKeyWithLoadingFunction(key, slowLoadingFunction, ttl)
    resultA.then(_ => {}) // just consume it

    await sleep(cleanupTime)
    cacheService.invalidateOutdated()

    //await sleep(loadingTime * 1000)
    // will fail if getForKeyWithLoadingFunction throws
  })

  test("Zombie key doesn't kill living", async () => {
    const cacheService = new CacheService()
    const key = "someKey"

    const shortTtl = {ms: 1};
    const longTtl = {seconds: 1};
    const loadingTime = {ms: 30};

    const slowLoadingFunction = async () => {
      await sleep(loadingTime);
      return Promise.resolve("Schnecke");
    }

    const fastLoadingFunction = async () => {
      return Promise.resolve("Hase");
    }

    const zombie = cacheService.getForKeyWithLoadingFunction(key, slowLoadingFunction, shortTtl);
    await sleep(shortTtl);

    const living = cacheService.getForKeyWithLoadingFunction(key, fastLoadingFunction, longTtl);
    const livingResponse = await living;
    expect(livingResponse).toBe("Hase");

    const zombieResponse = await zombie;
    expect(zombieResponse).toBe("Schnecke");

    expect(cacheService.outdatedKeys).not.toContain(key);
  })
})
