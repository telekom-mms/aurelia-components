# Value Converters

## anti-xss-html-sanitizer

Sanitizes HTML against XSS attacks for `innerhtml`, etc. via blacklist and RegEx.
Tries to escape all elements / discards nothing.

**Template**
```html
<span innerhtml.bind="insecureValue|sanitizeHTML"></span>
```

**Configuration**
```typescript
import {HTMLSanitizer} from "aurelia-templating-resources";

aurelia.use.singleton(HTMLSanitizer, AntiXssHtmlSanitizer);

const htmlSanitizer = aurelia.container.get(HTMLSanitizer) as AntiXssHtmlSanitizer;
htmlSanitizer.setUntrustedTags(["script", "img", "iframe"])
```

## sanitize-html-html-sanitizer

Requires optional peer dependency [sanitize-html](https://github.com/apostrophecms/sanitize-html).

Sanitizes HTML against XSS attacks for `innerhtml`, etc. via whitelist and parser.
Inherits options from sanitize-html library.

**Template**
```html
<span innerhtml.bind="insecureValue|sanitizeHTML"></span>
```

**Configuration**
```typescript
import sanitize from 'sanitize-html'
import {HTMLSanitizer} from "aurelia-templating-resources"

aurelia.use.singleton(HTMLSanitizer, SanitizeHtmlHtmlSanitizer)

const htmlSanitizer = aurelia.container.get(HTMLSanitizer) as SanitizeHtmlHtmlSanitizer
htmlSanitizer.withOptions(SanitizeHtmlHtmlSanitizer.paranoidOptions) // shortcut to allow nothing

const options: sanitize.IOptions = { ...sanitize.defaults } // get copy of library defaults for customization
options.disallowedTagsMode = "discard"                      // discard tags (rather than escape them)
options.allowedTags = ['b', 'i', 'img']                     // set whitelist (use .concat to add to)
options.allowedAttributes['img'] = ['src', 'alt']           /* whitelist attributes of a tag (does nothing,
                                                               if tag not whitelisted) */
htmlSanitizer.withOptions(options)
```
See [sanitize-html](https://github.com/apostrophecms/sanitize-html) for full manual.

## byte-format-value-converter

Formats bytes into the next higher byte form with a given precision.

**Template**
```html
<span>${bytes|byteFormat:2}</span>
```
Examples:
* `${1024|byteFormat}` -> `1 kiB`

## currency-value-converter

Formats a number to a given currency and a precision. If the number is smaller as the precision, it doubles the precision.

**Template**
```html
<span>${amount|currency:'EUR':3}</span>
```
Examples:
* `${0.0055|currency:"EUR":2}` -> `0,0055 €`
* `${0.036|currency:"USD":2}` -> `$ 0,04`

## date-format-value-converter

Formats a unix timestamp as milliseconds or formatted date string to a localized date format using *momentjs*.
Default format is "LLL".

You may need to update your `tsconfig.json`.
```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  }
}
```

**Template**
```html
<span>${unixTimeStampOrFormattedDateString|dateFormat:"L"}</span>
```

**API**
```typescript
const formatter = aurelia.container.get(DateFormatValueConverter);
formatter.setDefaultFormat("LLL");
```

**Requires**
```shell
npm install moment --save
```

## duration-format-value-converter

**Template**
```html
<span>${milliSeconds|durationFormat:"h[h] m[min] s[s]"}</span>
```
Examples:
* `${4100|durationFormat}` -> `1h 8mins 20s`

**API**
```typescript
const formatter = aurelia.container.get(DurationFormatValueConverter);
formatter.setDefaultFormat("h[h] m[min] s[s]");
```

**Requires**
```shell
npm install moment-duration-format --save
```

## highlight-text-value-converter

Highlights text by adding `<mark></mark>` tags. It uses the `HTMLSanitizer` interface to sanitize the input value before.

**Template**
```html
<input type="text" value.bind="_searchString" change.delegate="updateHighlight()"/>
<span innerhtml="${property|highlightText:_regexpOrString}">&nbsp;</span>
```

**ViewModel**
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
**Template**
```html
<span>${"."|repeatString:10}</span>
```

## sort-value-converter
**Template**
Sort by property `users.name` descending
```html
<span repeat.for="item of list|sort:'user.name':-1"></span>
```

## reverse-value-converter
**Template**
Reverse an array
```html
<span repeat.for="item of list|reverse"></span>
```

## object-keys-value-converter
**Template**
```html
<span repeat.for="key of objects|objectKeys"></span>
```

## object-values-value-converter
**Template**
```html
<span repeat.for="value of objects|objectValues"></span>
```

## number-value-converter
**Template**
```html
<span>${number|number:2}</span>
```
