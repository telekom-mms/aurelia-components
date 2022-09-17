# Utilities

## array/unique

Filters array to unique elements.

```typescript
import {unique} from "array";

const array = ["a", "a", "b", "b", "c", "c", "d"];
const uniqueArray = unique(array, (a, b) => a.localeCompare(b));
```

## bootstrap4-form-validation-renderer
```typescript
validationController.addRenderer(new Bootstrap4ValidationFormRenderer());
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

```typescript
import {bytesMap, getFactor, kiloMap} from "./numbers";

const posts = 1300;
const kilo = getFactor(posts, kiloMap);
const bytes = getFactor(posts, bytesMap);
console.log(`Your wrote ${(posts / kilo.factor).toFixed(1)} ${kilo.unit} posts with a size of ${(posts / bytes.factor).toFixed(0)} ${bytes.unit} `);
// You wrote 1.3k posts with a size of 1 KiB
```

## time

Provides some time functions.

### Adding/subtracting time

```typescript
import {addTimedelta, DateTimeComponents, subtractTimedelta} from "./time";

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

### Time components to seconds and milliseconds

```typescript
import {toMilliseconds} from "./time";

window.setTimeout(() => console.log("Hello"), toMilliseconds({seconds: 10}));
```

## timer

Generic Timer implementation

**ViewModel**
```typescript
import {autoinject} from "aurelia-dependency-injection";
import {Timer} from "utils/timer";
import {IntlDateFormatValueConverter} from "value-converters/intl-date-format-value-converter";

@autoinject
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

## trash-bin

Implements the behaviour of a trash bin.

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

## object-storage
Allows setting objects to an implementation of a Storage interface
```typescript
import {ObjectStorage} from "object-storage";

const objectStorage = new ObjectStorage();
objectStorage.setStorage(localStorage);

objectStorage.setItem("my-object", {});
const object = objectStorage.getItem("my-object");
```
