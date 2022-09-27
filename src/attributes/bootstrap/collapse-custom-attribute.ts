import {Collapse} from "bootstrap"
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class CollapseCustomAttribute {
    private collapse: Collapse | undefined

    constructor(private readonly element: Element) {}

    attached() {
        this.collapse = new Collapse(this.element)
    }

    unbind() {
        this.collapse?.dispose()
        this.collapse = undefined
    }
}
