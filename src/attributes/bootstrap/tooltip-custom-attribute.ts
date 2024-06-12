import {Tooltip} from "bootstrap"
import {inject} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@inject(Element)
export class TooltipCustomAttribute {
    private tooltip: Tooltip | undefined

    constructor(private readonly element: Element) {}

    attached() {
        this.tooltip = new Tooltip(this.element)
    }

    dispose() {
        this.tooltip?.dispose()
        this.tooltip = undefined
    }
}
