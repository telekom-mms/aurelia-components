
/**
 * Method for sorting an object recursively by key (arrays are not sorted)
 * @author Andreas Geyer <andreas.geyer@t-systems.com>
 * @param object
 */
export function recursiveObjectSort(object: object): object {
    const sorted_object: object = {};
    const sorted_objects: object[] = [];

    if (Array.isArray(object)) {
        object.forEach(obj => {
            sorted_objects.push(recursiveObjectSort(obj));
        });
        return sorted_objects;
    } else if (object && typeof object === "object") {
        let keysSorted = Object.getOwnPropertyNames(object)
            .filter(propertyName => {
                return !(propertyName.startsWith("__"))
            })
            .sort();

        keysSorted.forEach(key => {
            if (object[key]) {
                sorted_object[key] = recursiveObjectSort(object[key]);
            }
        });
        return sorted_object;
    }

    return object
}

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 * @deprecated Use native structuredClone instead
 */
export function clone(object: any) {
    return Object.create(null, Object.getOwnPropertyDescriptors(object));
}
