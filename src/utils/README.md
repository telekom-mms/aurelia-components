# Utilities

## bootstrap4-form-validation-renderer
```typescript
validationController.addRenderer(new Bootstrap4ValidationFormRenderer());
```


## clipboard

Implements a workaround for copying text in framed applications.

```typescript
import {Clipboard} from 'clipboard';

const clipboard = new Clipboard()
clipboard.writeText("hello world").then(() => console.log("Copied"));
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
import {createChecksum, clone} from 'objects';

const myObject = {
    "hello": "world"
}

const checksum = createChecksum(myObject);
const clonedObject = clone(myObject);
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
