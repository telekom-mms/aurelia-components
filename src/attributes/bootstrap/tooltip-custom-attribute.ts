import {Tooltip} from "bootstrap"
import {resolve} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class TooltipCustomAttribute {
    private tooltip: Tooltip | undefined
    private readonly _element = resolve(Element)

    attached() {
        this.tooltip = new Tooltip(this._element)
    }

    dispose() {
        this.tooltip?.dispose()
        this.tooltip = undefined
    }
}
