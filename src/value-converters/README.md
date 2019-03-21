# Value Converters

## date-format-value-converter

Formats a unix timestamp as milliseconds or formatted date string to a localized date format using moment.
Default format is "LLL".

### Template
```html
<span>${unixTimeStampOrFormattedDateString|dateFormat:"L"}</span>
```

## highlight-text-value-converter

Highlights text by adding `<mark></mark>` tags.

### Template
```html
<input type="text" value.bind="_searchString" change.delegate="updateHighlight()"/>
<span innerhtml="${property|highlightText:_regexpOrString}">&nbsp;</span>
```

### ViewModel
```typescript
export class ViewModel {
    private _searchString:string;
    private _regexpOrString:RegExp;
    
    private updateHighlight() {
        this._regexpOrString = new RegExp("(" + this._searchString + ")", "ig");
    }
}
```

## repeat-string-value-converter
### Template
```html
<span>${"."|repeatString:10}</span>
```

## sort-value-converter
### Template
Sort by property `users.name` descending
```html
<span repeat.for="item of list|sort:'user.name':-1"></span>
```

## object-keys-value-converter
### Template
```html
<span repeat.for="key of objects|objectKeys"></span>
```

## number-value-converter
### Template
```html
<span>${number|number:2}</span>
```

## currency-value-converter
### Template
```html
<span>${amount|currency:'EUR':3}</span>
```
