# Utilities

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
import {createChecksum} from 'objects';

console.log(createChecksum(myObject));
```

## bootstrap4-form-validation-renderer
```typescript
validationController.addRenderer(new Bootstrap4ValidationFormRenderer());
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

## bootstrap4-form-validation-renderer
```typescript
validationController.addRenderer(new Bootstrap4ValidationFormRenderer());
```

## placement

Places HTML elements by fixed coordinates

**Template**
```html
<button click.delegate="_toggleDropDown($event)">Open Drop Down</button>
<div class="dropdown-menu"
     id="dropDownContainer"
     class.bind="_dropDownVisible?'show':'hide'"
     false-on-click.two-way="_dropDownVisible">
    <a class="dropdown-item">Do something</a>
</div>
```

**ViewModel**
```typescript
import {Placement, VerticalAlign, HorizontalAlign} from 'placement';

private _toggleDropDown($event:Event) {
    this._dropDownVisible = true;
    window.setTimeout(()=>{
        Placement.placeRelative("#dropDownContainer", $event.target as HTMLElement, VerticalAlign.TOP_BOTTOM, HorizontalAlign.LEFT_LEFT);
    });
}
```
 
