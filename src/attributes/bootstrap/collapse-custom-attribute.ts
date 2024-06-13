import {Collapse} from "bootstrap"
import {resolve} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class CollapseCustomAttribute {
    private readonly _element = resolve(Element)
    private collapse: Collapse | undefined

    attached() {
        this.collapse = new Collapse(this._element)
    }

    dispose() {
        this.collapse?.dispose()
        this.collapse = undefined
    }
}
