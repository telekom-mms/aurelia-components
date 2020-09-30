# Attributes

## moment-custom-attribute

Formats and updates relative dates 

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

## become-visible-custom-attribute

Fires an event when an element became visible in the viewport.

### Template
```html
<div visible.delegate="_elementVisibility($event)" become-visible>
```

### ViewModel
```typescript
private _elementVisiblity($event:Event) {
    console.log("element visible:", $event.detail);
}
```

