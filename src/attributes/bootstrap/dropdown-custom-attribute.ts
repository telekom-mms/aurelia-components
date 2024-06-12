import {Dropdown} from "bootstrap"
import {inject} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@inject(Element)
export class DropdownCustomAttribute {
    private dropdown: Dropdown | undefined

    constructor(private readonly element: Element) {}

    attached() {
        this.dropdown = new Dropdown(this.element)
    }

    dispose() {
        this.dropdown?.dispose()
        this.dropdown = undefined
    }
}
