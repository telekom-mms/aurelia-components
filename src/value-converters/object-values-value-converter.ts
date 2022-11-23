/**
 * Iterate over object values
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class ObjectValuesValueConverter {
    toView(obj: { [s: string]: unknown; } | ArrayLike<unknown>) {
        return Object.values(obj);
    }
}
