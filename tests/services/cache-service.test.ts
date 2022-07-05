import {CacheService, Entry} from "../../src/services/cache-service";

describe("Entry", () => {
    test(".destructor turns .write into NOP", () => {
        let writeHappens: (string) => void
        const writePromise = new Promise<string>(resolve => writeHappens = resolve)

        const entry = new Entry(writePromise)
        entry.destructor()
        writeHappens("You shan't see this!")

        expect(entry.read(10)).toStrictEqual(false)
    })

    test(".read returns Promise before writePromise resolves", () => {
        const writePromise = new Promise<string>(_ => {}) // never resolves nor rejects
        const entry = new Entry(writePromise)
        expect(entry.read(-1)).toBeTruthy() // (even negative) lifespan ignored, because the write has not yet happened
    })

    test(".read returns resolving Promise once writePromise resolves", () => {
        let writeHappens: (string) => void
        const writtenWord = "Witness me!"
        const writePromise = new Promise<string>(resolve => writeHappens = resolve)

        const entry = new Entry(writePromise)
        writeHappens(writtenWord)

        expect(entry.read(1)).resolves.toBe(writtenWord)
    })
})

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

    test(".getForKeyWithLoadingFunction loading existing key for dead Entry creates new Entry", () => {
        const cacheService = new CacheService() // empty
        const key = "someKey"
        const promiseA = Promise.resolve({})
        const promiseB = Promise.resolve("Eyo!")

        const resultA = cacheService.getForKeyWithLoadingFunction(key, () => promiseA, 0) // immediately dies
        const resultB = cacheService.getForKeyWithLoadingFunction(key, () => promiseB)

        expect(resultA).not.toBe(resultB)
    })
})
