# Utilities

## trash-bin

Implements the behaviour of a trash bin.

### TypeScript
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
