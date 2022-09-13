/**
 * Iterate over object keys
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class ObjectKeysValueConverter {
    toView(obj: {}) {
        return Object.keys(obj);
    }
}
