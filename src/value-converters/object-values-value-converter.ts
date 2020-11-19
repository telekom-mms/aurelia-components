/**
 * Iterate over object values
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class ObjectValuesValueConverter {
    toView(obj) {
        return Object.values(obj);
    }
}
