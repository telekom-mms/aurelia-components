/**
 * Sorts an array by value
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * Usage: ${list|sort:'key':-1}
 */
export class SortValueConverter {
    toView(array, propertyName, factor:number=1) {
        return array.sort((a, b) => {
            const aVal = a[propertyName];
            if (typeof aVal === 'number') {
                return (aVal - b[propertyName]) * factor;
            } else {
                return aVal.localeCompare(b[propertyName]) * factor;
            }
        });
    }
}
