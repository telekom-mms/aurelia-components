/**
 * Allows storage of objects into storage interface
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class ObjectStorage {
    private _storage:Storage;

    setStorage(storage:Storage) {
        this._storage = storage;
        return this;
    }

    getItem(key:string):any {
        return JSON.parse(this._storage.getItem(key));
    }

    setItem(key:string, val:any) {
        this._storage.setItem(key, JSON.stringify(val));
        return this;
    }

    removeItem(key:string) {
        this._storage.removeItem(key);
        return this;
    }
}
