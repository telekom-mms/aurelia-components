import * as md5 from 'md5';

/**
 * Method for generating simple object checksums
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 * @param objects
 */
export function createChecksum(object: object | [], objects: any[] = []): string {
    if(!object){
        return ""
    }

    let sorted_object = recursiveObjectSort(object)

    return md5(JSON.stringify(sorted_object));
}

/**
 * Method for sorting an object recursively by key (arrays are not sorted)
 * @author Andreas Geyer <andreas.geyer@t-systems.com>
 * @param object
 */
export function recursiveObjectSort(object: object): object {
    let sorted_object: object = {};
    let sorted_objects: Array<object> = [];

    if (Array.isArray(object)) {
        object.forEach(obj => {
            sorted_objects.push(recursiveObjectSort(obj));
        })
        return sorted_objects;
    } else if (object && typeof object === "object") {
        let keysSorted = Object.keys(object).sort();
        keysSorted.forEach(key => {
            sorted_object[key] = recursiveObjectSort(object[key]);
        });
        return sorted_object;
    }

    return object
}

/**
 * lodash cloneDeep only clones enumerable properties
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/issues/121
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 */
export function clone(object: any) {
    return Object.create(null, Object.getOwnPropertyDescriptors(object));
}
