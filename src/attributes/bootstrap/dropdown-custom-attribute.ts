import {Dropdown} from "bootstrap"
import {resolve} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class DropdownCustomAttribute {
    private readonly _element = resolve(Element)
    private dropdown: Dropdown | undefined

    attached() {
        this.dropdown = new Dropdown(this._element)
    }

    dispose() {
        this.dropdown?.dispose()
        this.dropdown = undefined
    }
}
