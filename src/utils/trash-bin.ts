/**
 * Implementation of a trash bin
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class TrashBin<T> {
    private _trashItems:T[]=[];
    private _sourceItems:T[];
    private _onTrash:Function=null;
    private _onRestore:Function=null;
    static create<T>() {
        return new TrashBin<T>();
    }

    public source(source:T[]) {
        this._sourceItems = source;
        return this;
    }

    public onTrash(cb:(item:T)=>boolean|void) {
        this._onTrash = cb;
        return this;
    }

    public onRestore(cb:(item:T)=>boolean|void) {
        this._onRestore = cb;
        return this;
    }

    public trash(item:T, removeFromSource:boolean=true) {
        let index = this._sourceItems.indexOf(item);
        if (index>=0) {
            if (this._onTrash) {
                let shouldAdd = this._onTrash(item);
                if (shouldAdd===false) return this;
            }

            if (removeFromSource) {
                this._sourceItems.splice(index, 1);
            }
            this._trashItems.push(item);

        }
        return this;
    }

    public restore(item:T) {
        let trashIndex = this._trashItems.indexOf(item);
        if (this._onRestore) {
            let shouldRestore = this._onRestore(item);
            if (shouldRestore===false) return this;
        }
        if (trashIndex>=0) {
            this._trashItems.splice(trashIndex,1);
        }

        let sourceIndex = this._sourceItems.indexOf(item);
        if (sourceIndex === -1) {
            this._sourceItems.push(item);
        }

        return this;
    }

    public empty() {
        this._trashItems = [];
        return this;
    }

    public get trashItems():T[] {
        return this._trashItems;
    }

    public get sourceItems():T[] {
        return this._sourceItems;
    }
}
