import {autoinject} from "aurelia-dependency-injection";
import {Popover} from "bootstrap"

/** @author Christoph Reinsch <christoph.reinsch@t-systems.com> */
@autoinject()
export class PopoverCustomAttribute {
    private static readonly EMPTY_MARKER = "CONTENT_IS_MISSING"

    private popover: Popover | undefined

    constructor(private readonly element: Element) {}

    /** Note: <code>bind</code> happens before <code>aurelia-i18n</code>'s <code>tr</code>, so localised <code>data-bs-content</code> would be always missing. */
    attached() {
        const element = this.element // captured in content for warning on empty
        this.popover = new Popover(this.element, {
            content: function (this: HTMLElement) {
                const fromAttribute = this.attributes.getNamedItem("data-bs-content")
                if (fromAttribute?.value) {
                    return fromAttribute.value
                }
                else {
                    // Default behaviour: The popover is silently not displayed, no clues what went wrong.
                    console.warn("Popover created on element without filled data-bs-content attribute:",
                        element,
                        `The popover has been filled with '${PopoverCustomAttribute.EMPTY_MARKER}' for ease of reference.`)
                    return PopoverCustomAttribute.EMPTY_MARKER
                }
            }
        })
    }

    unbind() {
        this.popover?.dispose()
        this.popover = undefined
    }
}
