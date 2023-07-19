# Aurelia components

![npm](https://img.shields.io/npm/v/t-systems-aurelia-components)

Common useful components for the Aurelia Framework (https://aurelia.io)

## Documentation

You can find the documentation within the source.

* [Attributes](src/attributes/README.md)
  * [Bootstrap attributes](src/attributes/bootstrap/README.md) 
* [Components](src/components/README.md)
* [Services](src/services/README.md)
* [Utils](src/utils/README.md)
* [Value converters](src/value-converters/README.md)

## Install

```bash
npm install t-systems-aurelia-components --save
```

## Use in your Aurelia project

Since this library doesn't provide any precompiled `dist/` files, you need to reference the source code in your project.

### Aurelia features
Open `main.ts`
```typescript
aurelia.use
    .globalResources([
        PLATFORM.moduleName('t-systems-aurelia-components/src/value-converters/date-format-value-converter'),
    ])
```

### Direct imports
```typescript
import {CacheService} from "t-systems-aurelia-components/src/service/cache-service";
```

## Locale related features

Some extensions like `date-format-value-converter` or `currency-value-converter` support localization. To change their internal locale, use the `aurelia-i18n` library.

```typescript
import {I18N} from 'aurelia-i18n';
import {autoinject} from 'aurelia-framework';

@autoinject()
export class App {
    constructor(
        private readonly _i18n:I18N
    ) {
        this._i18n.setLocale("en");
    }
}
```

## Dependencies

Some of these libraries have dependencies which are not provided by this library, so please install them by yourself in your project.
```bash
npm install moment --save
```

If you want to use the sanitize-html-html-sanitizer [value-converter](src/value-converters/README.md):
```bash
npm install sanitize-html --save
```

## Publish this library to NPM

1. Enable 2FA in your account
2. Login as user (not as organisation)
    ```shell
    npm login
    ```
3. Change version in `package.json`
4. Run 
    ```shell
    npm publish
    ```
  
## Developing with this library
You can develop and bundling with this library directly by adding the library repository as dependency:
```shell
git clone https://github.com/telekom-mms/aurelia-components.git t-system-aurelia-components

cd your-project
npm install ../t-systems-aurelia-components
```

In this case you may need to install the library's dependencies first:
```shell
cd t-systems-aurelia-components
npm install bootstrap@4.4.1
```

## Unit tests

Run jest tests with
```shell
npm test
```
If tests are finished an HTML report is opened automatically.

## References
* Build and publish: https://medium.com/cameron-nokes/the-30-second-guide-to-publishing-a-typescript-package-to-npm-89d93ff7bccd
* https://lerna.js.org/
* Typescript unit testing: https://www.testim.io/blog/typescript-unit-testing-101/
