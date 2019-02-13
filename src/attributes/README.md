# Attributes

## moment-custom-attribute

### Template
```html
<span moment.bind="unixTimeStampOrFormattedDateString">&nbsp;</span>
```

### ViewModel
```typescript
import {UiUpdateEvent} from '../events/ui-update-event'
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework';

@autoinject()
export class App {
    private _uiUpdateInterval:any;
    constructor(
        private _eventAggregator:EventAggregator
    ) {
        
    }
    
    bind() {
         this._uiUpdateInterval = window.setInterval(()=>{
            this._eventAggregator.publish(UiUpdateEvent.NAME, UiUpdateEvent.create());
        }, 10000);
    }
    unbind() {
        window.clearInterval(this._uiUpdateInterval)
    }
}
```
