import {Popover} from "bootstrap"
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Christoph Reinsch <christoph.reinsch@t-systems.com>
 */
@autoinject()
export class PopoverCustomAttribute {
    private popover: Popover | undefined

    constructor(
        private readonly _element:Element,
    ) {
    }

    /** Note: <code>bind</code> happens before <code>aurelia-i18n</code>'s <code>tr</code>, so localised <code>data-bs-content</code> would be always missing. */
    attached() {
        this.popover = new Popover(this._element)
    }

    unbind() {
        this.popover?.dispose()
        this.popover = undefined
    }
}
