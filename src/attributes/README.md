# Attributes

## moment-custom-attribute

Formats and updates relative dates in a global timer loop.

**Template**
```html
<span moment.bind="unixTimeStampOrFormattedDateString">&nbsp;</span>
```

**ViewModel**
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

**Template**
```html
<div visible.delegate="_elementVisibility($event)" become-visible>
```

**ViewModel**
```typescript
private _elementVisiblity($event:CustomEvent) {
    console.log("element visible:", $event.detail);
}
```

## top-position-custom-attribute

Fires an event when an element reaches a specified top position. You can use this to implement sticky containers (headers for example).

**Template**
```html
<div reached.delegate="_elementReached($event)" class.bind="_sticky?'sticky':''" top-position="offset:10">
```

**ViewModel**
```typescript
private _elementReached($event:CustomEvent) {
    this._sticky = $event.detail;
}
```
**Style**
```css
.sticky {
    position: fixed;
    top: 10px;
}
```
