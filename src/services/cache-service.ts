interface ICacheServiceLoadingFunction {
    ():Promise<any>,
}

/**
 * Caches the response of any promise value of a loading function and prevents duplicate calls
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class CacheService {
    private _cacheContainer = {};
    private _defaultCacheTtlSeconds = 10;

    getForKeyWithLoadingFunction(
        key:string,
        loadingFunction:ICacheServiceLoadingFunction
    ):Promise<any> {
        let cacheEntry = this._cacheContainer[key];
        const now = (Date.now()/1000);
        if (cacheEntry !== undefined) {
            if (cacheEntry[0] >= now - this._defaultCacheTtlSeconds) {
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

    invalidateAll() {
        this._cacheContainer = {};
        return this;
    }
}
