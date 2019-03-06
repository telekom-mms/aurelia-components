/**
 * Method for generating simple object checksums
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 * @param objects
 */
export function createChecksum(object:object|[], objects:any[]=[]) {
    let string="[";
    objects.push(object);
    const filteredProps = Object.getOwnPropertyNames(object).filter(name=>name.indexOf("__")!==0);
    for (let key of filteredProps.sort()) {
        if (object[key]===null
            || object[key]===undefined
        ) {
            string += key+':null';
        } else if (typeof object[key] === 'object'
            && objects.indexOf(object[key]) === -1
        ) {
            string += key+':'+createChecksum(object[key], objects);
        } else {
            string += key+':'+object[key];
        }
    }
    return string+"]";
}

/**
 * lodash cloneDeep only clones enumerable properties
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/issues/121
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 */
export function clone(object:any) {
    return Object.create(null, Object.getOwnPropertyDescriptors(object));
}
