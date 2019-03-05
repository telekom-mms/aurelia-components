/**
 * Method for generating simple object checksums
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 * @param objects
 */
export function createChecksum(object:any, objects:any[]=[]) {
    let string="[";
    objects.push(object);
    for (let key of Object.getOwnPropertyNames(object).filter(name=>name!=="__observers__").sort()) {
        if (typeof object[key] === 'object'
            && objects.indexOf(object[key]) === -1
        ) {
            string += key+':'+createChecksum(object[key], objects);
        } else {
            string += key+':'+object[key];
        }
    }
    return string+"]";
}
