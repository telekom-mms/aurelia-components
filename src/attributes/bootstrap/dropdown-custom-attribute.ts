import {Dropdown} from "bootstrap"
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class DropdownCustomAttribute {
    private dropdown: Dropdown | undefined

    constructor(private readonly element: Element) {}

    bind() {
        this.dropdown = new Dropdown(this.element)
    }

    unbind() {
        this.dropdown?.dispose()
        this.dropdown = undefined
    }
}
