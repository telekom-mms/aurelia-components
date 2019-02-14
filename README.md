# Aurelia components
Common useful components for the Aurelia Framework (https://aurelia.io)

## Install

```bash
yarn add t-systems-aurelia-components
```

## Usage

Since this package is no official distributable package yet and contains only typescript sources, you may change your webpack configuration.

`webpack.config.js`
```js
rules: [
    {
      test: /\.ts$/,
      loader: "ts-loader",
      options: {
        allowTsInNodeModules: true
      }
    }
]
```

`tsconfig.json`
```json
"include": [
  "./src/**/*.ts",
  "./node_modules/t-systems-aurelia-components/src/**/*.ts"
],
```

Import directly from sources
```typescript
import {CacheService} from 't-systems-aurelia-components/src/services/cache-service'
```
