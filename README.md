# Aurelia components

![npm](https://img.shields.io/npm/v/t-systems-aurelia-components)

Common useful components for the Aurelia 2 Framework (https://docs.aurelia.io/)

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
npm install mreiche-aurelia-components --save
```

## Use in your Aurelia project

Since this library doesn't provide any precompiled `dist/` files, you need to reference the source code `main.ts` like.

```typescript
import {NumberValueConverter} from "mreiche-aurelia-components/src/value-converters/number-value-converter";

Aurelia
    // ...
    .register(NumberValueConverter)
    // ...
```

## Locale related features

Some extensions like `date-format-value-converter` or `currency-value-converter` support localization. To change their internal locale, use the `@aurelia/i18n` library.

```typescript
import {I18N} from '@aurelia/i18n';
import {resolve} from 'aurelia';

export class App {
    constructor(
        i18n = resolve(I18N)
    ) {
        i18n.setLocale("en");
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

### Develop against a local branch

This library publishes its compiled output (`main`/`types` point into `dist/`), so the
library has to be built before it can be linked — a linked source checkout alone does not
resolve.

1. Build the library:

        pnpm install
        pnpm build

2. Link it into this project:

        cd ../your-project
        pnpm install ../mreiche-aurelia-components

   This adds `"mreiche-aurelia-components": "link:../mreiche-aurelia-components"` to `dependencies` and symlinks
   `node_modules/mreiche-aurelia-components` to the sibling checkout.

3. Verify and run:

        pnpm start
        pnpm test

Rebuild the library after every change. For a tight loop, keep a compiler running in the
library checkout — webpack follows the symlink to the real files and reloads on rebuild:

    cd ../mreiche-aurelia-components && npx tsc --watch

To switch back to the published package:

    pnpm install mreiche-aurelia-components

## Unit tests

Run jest tests with
```shell
npm test
```

## References
* Build and publish: https://medium.com/cameron-nokes/the-30-second-guide-to-publishing-a-typescript-package-to-npm-89d93ff7bccd
* https://lerna.js.org/
* Typescript unit testing: https://www.testim.io/blog/typescript-unit-testing-101/
