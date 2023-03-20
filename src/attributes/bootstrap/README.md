# Bootstrap Attributes

These attributes require the *Bootstrap* library to be installed.
```shell
npm install bootstrap@5.1.3
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

## popover-custom-attribute

```html
<a href="#"
   title="Popover title"
   data-content="This is the content of the popover"
   data-placement="top"
   data-popover
>Tooltip</a>
```
Note that for a "dismissable" popover using the attribute `data-trigger="focus"`, the element having the popover attached must be able to receive focus. (See this [StackOverflow answer](https://stackoverflow.com/a/1600194) on which elements can receive focus)
