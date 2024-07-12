# Utilities

## array/unique

Filters array to unique elements.

```typescript
import {unique} from "array";

const array = ["a", "a", "b", "b", "c", "c", "d"];
const uniqueArray = unique(array, (a, b) => a.localeCompare(b));
```

## bootstrap5-form-validation-renderer
```typescript
validationController.addRenderer(new Bootstrap5ValidationFormRenderer());
```

## checksum (`@deprecated`)
```typescript
import {createChecksum} from 'objects';

const myObject = {
    "hello": "world"
}

const checksum = createChecksum(myObject);
```

## clipboard

Implements a workaround for copying text in framed applications.

```typescript
import {Clipboard} from 'clipboard';

const clipboard = new Clipboard()
clipboard.writeText("hello world").then(() => console.log("Copied"));
```

## numbers

Number handling and formatting.

### Factor mapping

```typescript
import {bytesMap, getFactor, kiloMap} from "utils/numbers";

const posts = 1300;
const kilo = getFactor(posts, kiloMap);
const bytes = getFactor(posts, bytesMap);
console.log(`Your wrote ${(posts / kilo.factor).toFixed(1)} ${kilo.unit} posts with a size of ${(posts / bytes.factor).toFixed(0)} ${bytes.unit} `);
// You wrote 1.3k posts with a size of 1 KiB
```

### Mathematical round

```typescript
import {round} from "utils/numbers";

const value = 0.016
const round = round(2)
// round == 0.02
```

### Calc floating point precision

```typescript
import {calcDecimalPlace} from "utils/numbers";

const value = 0.000123
const precision = calcDecimalPlace(value, 3)
// precision == 6
```

Combined example

```typescript
import {round, calcDecimalPlace} from "utils/numbers";

function financialRound(value: number) {
  return round(value, calcDecimalPlace(value, 3));
}
```

## time

Provides some time functions.

### Adding/subtracting time

```typescript
import {addTimedelta, DateTimeComponents, subtractTimedelta} from "utils/time";

const now = new Date();
const timedelta: DateTimeComponents = {
  days: 10
}
const newDate = addTimedelta(now, timedelta);
const oldDate = subtractTimedelta(newDate, timedelta);
```

### Normalize time

Normalizes the time of a given date to full divisors of the components.

```typescript
import {normalizeTime, TimeComponents} from "./time";

const now = new Date();
// now: 13:44:33

const timedelta: TimeComponents = {
  hours: 4,
  minutes: 5,
  seconds: 0
}

const newDate = normalizeTime(now, timedelta);
// newDate: 12:40:00
```

### Set date or time components
```typescript
import {setComponents, TimeComponents} from "./time";

const now = new Date();
// now: 13:44:33

const timedelta: TimeComponents = {
  minutes: 5,
  seconds: 0
}

const newDate = setComponents(now, timedelta);
// newDate: 13:05:00
```

### Time components to seconds and milliseconds

```typescript
import {toMilliseconds} from "./time";

window.setTimeout(() => console.log("Hello"), toMilliseconds({seconds: 10}));
```

### Sleep an amount of time
```typescript
import {sleep} from "./time";

await sleep({seconds: 10});
```

## timer

Generic Timer implementation

**ViewModel**
```typescript
import {inject} from "aurelia";
import {Timer} from "utils/timer";
import {IntlDateFormatValueConverter} from "value-converters/intl-date-format-value-converter";

@inject(IntlDateFormatValueConverter)
export class ViewModel {
    private readonly _timer: Timer

    construct(dateFormatter: IntlDateFormatValueConverter) {
        dateFormatter.setOptions("hour", {
            minute: "numeric",
            second: "numeric"
        })

        this._timer = new Timer({
            duration: {minutes: 5},
            onComplete: timer => {
                // do something
            }
        })
    }

    attached() {
        this._timer.start()
    }

    detached() {
        this._timer.dispose()
    }
}
```

**Template**
```html
${_timer.timeLeft|dateFormat:"hour"}
// 04:59
```

## trash-bin (`@deprecated`)

Implements the behaviour of a trash bin.

This utility is `@deprecated` because it's too specific and hard to reuse generally.


**TypeScript**
```typescript
import {TrashBin} from 'trash-bin';

const itemList = [
    {
        name: "Something",
        deleted: false,
        deletable: false,
    }
];

const trashBin = TrashBin.create<any>();
trashBin.source(itemList);
trashBin.onTrash(item => {
    // Prevent deletion
    if (item.deletable === false) {
        return false;
    } else {
        item.deleted = true;
    }
});
trashBin.onRestore(item=>{
    item.deleted = false;
});

const item = itemList[0];
trashBin.trash(item);
console.log(trashBin.sourceItems.length); // 0
console.log(trashBin.trashItems.length); // 1

trashBin.restore(item);
console.log(trashBin.sourceItems.length); // 1
console.log(trashBin.trashItems.length); // 0

trashBin.empty();
```

## object
```typescript
import {recursiveObjectSort} from 'objects';

const myObject = {
    "katze": "kuh",
    "hello": "world",
}

const sorted = recursiveObjectSort(myObject);
```

## object-storage (`@deprecated`)
Allows setting objects to an implementation of a Storage interface
This utility is deprecated, use https://github.com/nanostores/nanostores instead

```typescript
import {ObjectStorage} from "object-storage";

const objectStorage = new ObjectStorage();
objectStorage.setStorage(localStorage);

objectStorage.setItem("my-object", {});
const object = objectStorage.getItem("my-object");
```
