/**
 * Sorts an array by value
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * Usage: ${list|sort:'property.otherproperty':-1}
 */
export class SortValueConverter {
    toView(array:any[], propertyName:string, factor:number=1) {
        if (!(array instanceof Array)) {
            return [];
        }
        let propertyPath: string[];
        if (propertyName) {
            propertyPath = propertyName.split('.');
        } else {
            propertyPath = [];
        }
        return array.slice(0).sort((a, b) => {
            const aVal = SortValueConverter.getPropertyByPath(a, propertyPath);
            const bVal = SortValueConverter.getPropertyByPath(b, propertyPath);
            if (typeof aVal === 'number') {
                return (aVal - bVal) * factor;
            } else if (typeof aVal === 'string') {
                return aVal.localeCompare(bVal) * factor;
            }
        });
    }

    static getPropertyByPath(object: { [index: string]: any }, propertyPath: string[]): any {
        for (const propertyName of propertyPath) {
            if (object[propertyName] !== undefined) {
                object = object[propertyName];
            } else {
                break;
            }
        }
        return object;
    }
}
