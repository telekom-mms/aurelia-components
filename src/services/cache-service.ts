/**
 * Caches the response of any promise value of a loading function and prevents duplicate calls
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {TimeComponents, toMilliseconds} from "../utils/time";

export class CacheService {
    private _cacheContainer:{[key: string]: [number, Promise<any>]} = {};
    private _defaultCacheTtl:TimeComponents = {seconds: 10};

    /**
     *
     * @param key The key for cached value
     * @param loadingFunction The loading function returning a promise of the value.
     * @param ttl The cache timeout for the response.
     */
    getForKeyWithLoadingFunction <T> (
        key:string,
        loadingFunction:() => Promise<T>,
        ttl:number|TimeComponents = this._defaultCacheTtl
    ):Promise<T> {
        const cacheEntry = this._cacheContainer[key];
        const now = Date.now();

        if (cacheEntry !== undefined && cacheEntry[0] >= now) {
            return cacheEntry[1];
        }

        ttl = CacheService.wrapTtl(ttl);
        const cacheTtlMs = toMilliseconds(ttl);
        const validUntil = now + cacheTtlMs;
        this._cacheContainer[key] = [
            validUntil,
            loadingFunction().then(response => {
                const cachedResponse = Promise.resolve(response);
                this._cacheContainer[key] = [validUntil, cachedResponse];
                return cachedResponse;
            })
        ];
        return this._cacheContainer[key][1];
    }

    /**
     * @deprecated Passing seconds as cache TTL is deprecated.
     */
    private static wrapTtl(ttl:number|TimeComponents):TimeComponents {
        if (typeof ttl === "number") {
            return {seconds: ttl}
        }
        return ttl;
    }

    /**
     * Changes the default cache TTL.
     * @param ttl Cache TTL as TimeComponents
     */
    setDefaultCacheTtl(ttl:number|TimeComponents) {
        this._defaultCacheTtl = CacheService.wrapTtl(ttl);
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
