/**
 * Caches the response of any promise value of a loading function
 * @author Mike Reiche <mike.reiche@t-sytems.com>
 */
export class CacheService {
    private _cacheContainer = {};
    private _defaultCacheTtlSeconds = 10;

    /**
     * @todo Define interface for loadingFunction (must return a promise)
     */
    getForKeyWithLoadingFunction(
        key:string,
        loadingFunction:Function
    ):Promise<any> {
        let cacheEntry = this._cacheContainer[key];
        if (cacheEntry !== undefined) {
            if (cacheEntry[0] >= (Date.now()/1000) - this._defaultCacheTtlSeconds) {
                return new Promise((resolve, reject) => {
                    resolve(cacheEntry[1]);
                });
            }
        }
        return loadingFunction().then(object=>{
            this._cacheContainer[key] = [Date.now()/1000, object];
            return object;
        });
    }

    set defaultCacheTtl(seconds:number) {
        this._defaultCacheTtlSeconds = seconds;
    }
}
