# Events

## locale-changed

### ViewModel
```typescript
import {ChangeLocaleEvent} from '../events/change-locale-event'
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework';

@autoinject()
export class App {
    constructor(
        private _eventAggregator:EventAggregator
    ) {
        this._eventAggregator.publish(ChangeLocaleEvent.NAME, ChangeLocaleEvent.create().setLocale('de'));        
    }
}
```
