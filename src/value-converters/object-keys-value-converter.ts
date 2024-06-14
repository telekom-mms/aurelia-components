import {valueConverter} from "aurelia";

/**
 * Iterate over object keys
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@valueConverter("objectKeys")
export class ObjectKeysValueConverter {
    toView(obj: object) {
        return Object.keys(obj);
    }
}
