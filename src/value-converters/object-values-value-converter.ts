import {valueConverter} from "aurelia";

/**
 * Iterate over object values
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@valueConverter("objectValues")
export class ObjectValuesValueConverter {
    toView(obj: object) {
        if (obj) return Object.values(obj);
    }
}
