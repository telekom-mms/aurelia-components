import {Tooltip} from "bootstrap"
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class TooltipCustomAttribute {
    private tooltip: Tooltip | undefined

    constructor(private readonly element: Element) {}

    bind() {
        this.tooltip = new Tooltip(this.element)
    }

    unbind() {
        this.tooltip?.dispose()
        this.tooltip = undefined
    }
}
