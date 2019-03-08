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

## false-on-click-custom-attribute

You can use this attribute to close dropdowns or menus on mouse click.

### Template
```html
<div class="dropdown-menu"
    class.bind="_showMenu?'show':'hide'"
    false-on-click.two-way="_showMenu">
</div>
```

If you dont want to close on click, then just prevent event delegation.
```html
<div class="dropdown-menu"
    class.bind="_showMenu?'show':'hide'"
    false-on-click.two-way="_showMenu">
    <button click.delegate="_preventClick($event)">Click me</button>
</div>
```

### ViewModel
```typescript
private _preventClick($event:Event) {
    $event.stopPropagation();
}
```



