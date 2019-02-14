# Value Converters

## date-format-value-converter

Formats a unix timestamp or formatted date string to a localized date format using moment.
Default format is "LLL".

### Template
```html
<span>${unixTimeStampOrFormattedDateString|dateFormat:"L"}</span>
```

## highlight-text-value-converter
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
