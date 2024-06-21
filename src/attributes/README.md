# Attributes

## moment-custom-attribute

Formats and updates relative dates in a global timer loop.
You have to trigger the update loop by publishing the `UiUpdateEvent` on your on.

**Template**
```html
<span moment.bind="unixTimeStampOrFormattedDateString">&nbsp;</span>
```

**ViewModel**
```typescript
import {UiUpdateEvent} from '../events/ui-update-event'
import {resolve, IEventAggregator} from 'aurelia';

export class App {
    private _uiUpdateInterval:any;
    private _eventAggregator = resolve(IEventAggregator)

    bind() {
         this._uiUpdateInterval = window.setInterval(()=>{
            this._eventAggregator.publish(UiUpdateEvent.NAME, new UiUpdateEvent());
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
<div visible.trigger="_elementVisibility($event)" become-visible>
```

**ViewModel**
```typescript
class ViewModel {
    private _elementVisibility($event: CustomEvent) {
        console.log("element visible:", $event.detail);
    }
}
```
