# Bootstrap Attributes

These attributes requiring the *Bootstrap* library installed.
```shell
npm install bootstrap@4.4.1
```
because they are refering to the raw *Bootstrap* Javascript source like:
```typescript
import 'bootstrap/js/src/collapse';
```

## collapse-custom-attribute

```html
<div id="target"
     class="collapse"
></div>
<a href="#"
  data-target="#tapHeader"
  data-toggle="collapse"
  collapse
>Collapse</a>
```

## toast-custom-attribute

```html
<div class="toast"
     role="alert"
     aria-live="assertive"
     aria-atomic="true"
     toast-hidden.delegate="dismiss(toast)"
     toast
></div>
```

## tooltip-custom-attribute

```html
<a href="#"
   title="This is a tooltip"
   data-toggle="tooltip"
   data-placement="bottom"
   tooltip
>Tooltip</a>
```

## dropdown-custom-attribute

```html
<button type="button"
        data-toggle="dropdown"
        dropdown
></button>
<div class="dropdown-menu">
</div>
```

# Bootstrap 5 Attributes

use proper imports and a bootstrap entry in `optionalPeerDependencies`

## popover-custom-attribute

Can be given the optional value "empty" to use default Bootstrap behaviour silently not displaying Popovers with empty content. If no value is given, will log a warning instead and fill the Popover with a marker text for easy diagnosis.
```html
<a href="#"
   title="Popover title"
   data-content="This is the content of the popover"
   data-placement="top"
   popover
>Tooltip</a>
```
Note that for a "dismissable" popover using the attribute `data-trigger="focus"`, the element having the popover attached must be able to receive focus. (See this [StackOverflow answer](https://stackoverflow.com/a/1600194) on which elements can receive focus)
