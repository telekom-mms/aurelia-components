# Components

## cache-service

### ViewModel
```typescript
import {CacheService} from "cache-service";
import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject()
export class ViewModel {
    constructor(
        private _cacheService:CacheService,
        private _httpClient: HttpClient
    ) {
        
    }
    
    loadSomething() {
        
        const loadingLambda = () => {
            return  this._httpClient.fetch('http://example.com/anything.json');
        };
        
        this._cacheService.getForKeyWithLoadingFunction('cache-id', loadingLambda)
            .then(response=>{
                console.log(response);
            });
    }
}
```
