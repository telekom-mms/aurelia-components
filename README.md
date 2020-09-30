# Aurelia components
Common useful components for the Aurelia Framework (https://aurelia.io)

## Install

```bash
npm install t-systems-aurelia-components --save
```

## Use in your Aurelia project

Open `main.ts`
```typescript
aurelia
    .use
    .globalResources([
      PLATFORM.moduleName('t-systems-aurelia-components/src/value-converters/date-format-value-converter'),
    ])
```

Some of these libraries have dependencies which are not provided by this library, so please install them by yourself.
```bash
npm install momentjs --save
```

## Publish

```bash
npm run build
npm publish
```

## References
* Build and publish: https://medium.com/cameron-nokes/the-30-second-guide-to-publishing-a-typescript-package-to-npm-89d93ff7bccd
