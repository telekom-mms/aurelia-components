/**
 * Caches the response of any promise value of a loading function and prevents duplicate calls
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class CacheService {
    private _cacheContainer:{[key: string]: [number, Promise<any>]} = {};
    private _defaultCacheTtlSeconds = 10;

    /**
     *
     * @param key The key for cached value
     * @param loadingFunction The loading function returning a promise of the value.
     * @param cacheTtlSeconds The accepted cache timeout in seconds for this call.
     */
    getForKeyWithLoadingFunction <T> (
        key:string,
        loadingFunction:() => Promise<T>,
        cacheTtlSeconds = this._defaultCacheTtlSeconds
    ):Promise<T> {
        const cacheEntry = this._cacheContainer[key];
        const now = Date.now();

        if (
            cacheEntry !== undefined
            && cacheTtlSeconds > 0
            && cacheEntry[0] >= now
        ) {
            return cacheEntry[1];
        }

        const cacheTtlMs = cacheTtlSeconds * 1000;
        const validUntil = now + cacheTtlMs;
        this._cacheContainer[key] = [
            validUntil,
            loadingFunction().then(object => {
                return this._cacheContainer[key][1] = Promise.resolve(object);
            })
        ];
        return this._cacheContainer[key][1];
    }

    /**
     * Changes the default cache TTL.
     * @param seconds
     */
    setDefaultCacheTtl(seconds:number) {
        this._defaultCacheTtlSeconds = seconds;
        return this;
    }

    /**
     * Invalidates a list of keys
     * @param keys
     */
    invalidate(keys:string[]) {
        for (const key of keys) {
            delete this._cacheContainer[key];
        }
        return this;
    }

    /**
     * Returns a list of outdated keys.
     */
    get outdatedKeys() {
        const now = Date.now();
        let cacheEntry;
        const keys = [];
        for (const key in this._cacheContainer) {
            cacheEntry = this._cacheContainer[key];
            if (cacheEntry[0] < now) {
                keys.push(key);
            }
        }
        return keys;
    }

    /**
     * A list of all existing cache keys.
     */
    get cacheKeys() {
        return Object.keys(this._cacheContainer);
    }

    /**
     * Clears all caches
     */
    invalidateAll() {
        this._cacheContainer = {};
        return this;
    }

    /**
     * Invalidates all outdated keys.
     */
    invalidateOutdated() {
        this.invalidate(this.outdatedKeys);
    }
}
