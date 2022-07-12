import {CacheService} from "../../src/services/cache-service";

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
    await sleep(10);
    const resultB = await cacheService.getForKeyWithLoadingFunction(key, () => promiseB,0);

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

    let result = await cacheService.getForKeyWithLoadingFunction(key, loadingFunction, 1);
    expect(result).toBe("Katze");
    expect(callCount).toBe(1);
    expect(cacheService.outdatedKeys.length).toBe(0);

    result = await cacheService.getForKeyWithLoadingFunction(key, loadingFunction, 1);
    expect(result).toBe("Katze");
    expect(callCount).toBe(1);
    expect(cacheService.outdatedKeys.length).toBe(0);

    result = await cacheService.getForKeyWithLoadingFunction(key, loadingFunction, 0);
    expect(result).toBe("Katze");
    expect(callCount).toBe(2);
    expect(cacheService.outdatedKeys.length).toBe(0);

    await sleep(10);
    expect(cacheService.outdatedKeys).toContain(key);
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
    const resultB = cacheService.getForKeyWithLoadingFunction(key, fastLoadingFunction);
    expect(resultB).not.toBe(resultA);

    await resultA.then(value => expect(value).toBe("Schnecke"));
    await resultB.then(value => expect(value).toBe("Hase"));
  })
})
