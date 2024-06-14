# Components

## cache-service

Use this service to cache network responses or any other object for a several amount of time.

Note: This services doesn't invalidate cached items on its own.

**ViewModel**

```typescript
import {CacheService} from "cache-service";
import {resolve} from 'aurelia';
import {HttpClient} from '@aurelia/fetch-client';
import {toMilliseconds} from "./time";

@inject()
export class ViewModel {
    private readonly _cacheService = resolve(CacheService)
    private readonly _httpClient = resolve(HttpClient)
    
    constructor() {
        const defaultCacheTttl = {seconds: 60};
        this._cacheService.setDefaultCacheTtl(defaultCacheTttl);
        
        // Invalidate outdated keys periodically
        window.setInterval(() => {
            this._cacheService.invalidateOutdated();
        }, toMilliseconds(defaultCacheTttl))
    }

    loadSomething() {
        const loadingLambda = () => {
            return this._httpClient.fetch('http://example.com/anything.json');
        };

        this._cacheService.getForKeyWithLoadingFunction('cache-id', loadingLambda)
            .then(response => {
                console.log(response);
            });
    }
}
```
