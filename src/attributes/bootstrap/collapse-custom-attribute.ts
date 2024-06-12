import {Collapse} from "bootstrap"
import {inject} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@inject(Element)
export class CollapseCustomAttribute {
    private collapse: Collapse | undefined

    constructor(private readonly element: Element) {}

    attached() {
        this.collapse = new Collapse(this.element)
    }

    dispose() {
        this.collapse?.dispose()
        this.collapse = undefined
    }
}
