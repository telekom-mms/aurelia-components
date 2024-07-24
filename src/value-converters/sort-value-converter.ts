/**
 * Sorts an array by value
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * Usage: ${list|sort:'property.otherproperty':-1}
 */
export class SortValueConverter {
    toView(array: any[], propertyName: string = null, factor: number = 1) {
        if (!(array instanceof Array)) {
            return [];
        }

        let propertyPath: string[];
        if (propertyName) {
            propertyPath = propertyName.split('.');
        } else {
            propertyPath = [];
        }
        return array.slice(0).sort((aVal, bVal) => {
            if (propertyPath.length > 0) {
                aVal = SortValueConverter.getPropertyByPath(aVal, propertyPath);
                bVal = SortValueConverter.getPropertyByPath(bVal, propertyPath);
            }

            if (aVal === true) {
                aVal = 1
            } else if (aVal === false) {
                aVal = Number.MAX_SAFE_INTEGER
            }

            if (bVal === true) {
                bVal = 1
            } else if (bVal === false) {
                bVal = Number.MAX_SAFE_INTEGER
            }

            if (typeof aVal === 'number' && typeof bVal == 'number') {
                return (aVal - bVal) * factor;
            } else if (!aVal) {
                return 1;
            } else {
                return aVal.toString().localeCompare(bVal) * factor;
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
