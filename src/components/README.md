# Components

## empty

Is just an empty view. You may need it for empty default routes.

**ViewModel**
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

**Template**
```html
<progress-ring stroke="2" radius="20" color="green" progress.bind="progress"></progress-ring>
```

## switch (`@deprecated`)

Checkbox based switch. Deprecated since Bootstrap 5 has an own switch component.

**Template**
```html
<switch disabled="false"
        switched.bind="_switched"
        use-id="mySwitch"
        use-name="mySwitch"
></switch>
```

**Smaller style**
```css
switch label.switch {
  width: 48px;
  height: 22px;
}

switch label span.slider:before {
  bottom: 2px;
  left: 2px;
  height: 18px;
  width: 18px;
}
```
