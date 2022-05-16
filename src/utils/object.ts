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
 * Deep clone of object
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/issues/121
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 */
export function clone(src: any) {
    const target = {};
    for (const prop in src) {
        if (src.hasOwnProperty(prop)) {
            if(src[prop] != null && typeof src[prop] === 'object') {
                target[prop] = clone(src[prop]);
            } else {
                target[prop] = src[prop];
            }
        }
    }
    return target;
}
