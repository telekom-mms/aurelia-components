# Components

## empty

### ViewModel
```typescript
import {Router, RouterConfiguration} from "aurelia-router";
import {PLATFORM} from 'aurelia-framework';

export class ViewModel {
    configureRouter(config:RouterConfiguration, router:Router) {
        config.map([
            {
                route: '',
                moduleId: PLATFORM.moduleName('t-systems-aurelia-components/src/components/empty/empty'),
            },
        ]);
    }
}
```

## progress-ring

A circular progress indicator

### Template
```html
<progress-ring stroke="2" radius="20" color="green" progress.bind="progress"></progress-ring>
```
