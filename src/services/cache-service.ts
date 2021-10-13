/**
 * Caches the response of any promise value of a loading function and prevents duplicate calls
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class CacheService {
    private _cacheContainer = {};
    private _defaultCacheTtlSeconds = 10;

    getForKeyWithLoadingFunction <T> (
        key:string,
        loadingFunction:() => Promise<T>,
        cacheTtlSeconds = this._defaultCacheTtlSeconds
    ):Promise<T> {
        let cacheEntry = this._cacheContainer[key];
        const now = (Date.now()/1000);
        if (cacheEntry !== undefined) {
            if (cacheEntry[0] >= now - cacheTtlSeconds) {
                return cacheEntry[1];
            }
        }

        this._cacheContainer[key] = [
            now,
            loadingFunction().then(object=>{
                return this._cacheContainer[key][1] = Promise.resolve(object);
            })
        ];
        return this._cacheContainer[key][1];
    }

    setDefaultCacheTtl(seconds:number) {
        this._defaultCacheTtlSeconds = seconds;
        return this;
    }

    invalidate(keys:string[]) {
        for (let key of keys) {
            delete this._cacheContainer[key];
        }
        return this;
    }

    get outdatedKeys() {
        const now = (Date.now()/1000);
        let cacheEntry;
        const keys = [];
        for (let key in this._cacheContainer) {
            cacheEntry = this._cacheContainer[key];
            if (cacheEntry[0] < now - this._defaultCacheTtlSeconds) {
                keys.push(key);
            }
        }
        return keys;
    }

    get cacheKeys() {
        return Object.keys(this._cacheContainer);
    }

    invalidateAll() {
        this._cacheContainer = {};
        return this;
    }
}
