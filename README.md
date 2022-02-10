# Aurelia components
Common useful components for the Aurelia Framework (https://aurelia.io)

## Documentation

You can find the documentation within the source.

* [Attributes](src/attributes/README.md)
* [Components](src/components/README.md)
* [Services](src/services/README.md)
* [Utils](src/utils/README.md)
* [Value converters](src/value-converters/README.md)

## Install

```bash
npm install t-systems-aurelia-components --save
```

## Use in your Aurelia project

Open `main.ts`
```typescript
aurelia.use
    .globalResources([
        PLATFORM.moduleName('t-systems-aurelia-components/src/value-converters/date-format-value-converter'),
    ])
```

## Locale related features

Some extensions like `date-format-value-converter` or `currency-value-converter` support localization. To change their internal locale, use the `aurelia-i18n` library.

```typescript
import {I18N} from 'aurelia-i18n';
import {autoinject} from 'aurelia-framework';

@autoinject()
export class App {
    constructor(
        private _i18n:I18N
    ) {
        this.i18n.setLocale("en");
    }
}
```

## Dependencies

Some of these libraries have dependencies which are not provided by this library, so please install them by yourself.
```bash
npm install momentjs --save
```

## Publish

* Enable 2FA in your account
* Login as user (not as organisation)
    ```shell
    npm login
    ```
* Change version in `package.json`
* Run 
    ```shell
    npm publish
    ```

## References
* Build and publish: https://medium.com/cameron-nokes/the-30-second-guide-to-publishing-a-typescript-package-to-npm-89d93ff7bccd
* https://lerna.js.org/
