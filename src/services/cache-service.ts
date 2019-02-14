/**
 * Caches the response of any promise value of a loading function and prevents duplicate calls
 * @author Mike Reiche <mike.reiche@t-systems.com>
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
                return cacheEntry[1];
            }
        }

        this._cacheContainer[key] = [
            Date.now()/1000,
            loadingFunction().then(object=>{
                return this._cacheContainer[key][1] = new Promise((resolve, reject)=>{
                    return resolve(object);
                });
            })
        ];
        return this._cacheContainer[key][1];
    }

    set defaultCacheTtl(seconds:number) {
        this._defaultCacheTtlSeconds = seconds;
    }
}
