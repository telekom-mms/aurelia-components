# Components

## cache-service

Use this service to cache network responses or any other object for a several amount of time.

Note: This services doesn't invalidate cached items on its own.

**ViewModel**
```typescript
import {CacheService} from "cache-service";
import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject()
export class ViewModel {
    constructor(
        private _cacheService: CacheService,
        private _httpClient: HttpClient
    ) {
        this._cacheService.setDefaultCacheTtl(60);
    }
    
    loadSomething() {
        const loadingLambda = () => {
            return this._httpClient.fetch('http://example.com/anything.json');
        };
        
        this._cacheService.getForKeyWithLoadingFunction('cache-id', loadingLambda)
            .then(response=>{
                console.log(response);
            });
    }
    
    clearCache() {
        const keys = this._cacheService.outdatedKeys;
        this._cacheService.invalidate(keys);
        // this._cacheService.invalidateAll();
    }
}
```
