import {autoinject} from "aurelia-dependency-injection";

/**
 * Custom attribute for detection of element visibility
 * Usage: <div visible.delegate="elementVisibility($event)" become-visible>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class BecomeVisibleCustomAttribute {

    private _visible:Boolean = false;

    constructor(
        private _element:Element
    ) {

    }

    /**
     * @see https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
     */
    static elementInViewport2(el) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let width = el.offsetWidth;
        let height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    handleEvent(event) {
        let isVisible = BecomeVisibleCustomAttribute.elementInViewport2(this._element as HTMLElement);
        if (this._visible !== isVisible) {
            this._visible = isVisible;
            const ev = new CustomEvent('visible', {
                detail: this._visible,
                bubbles: true
            });
            this._element.dispatchEvent(ev);
        }
    }

    bind() {
        window.addEventListener("scroll", this, false)
    }

    unbind() {
        window.removeEventListener("scroll", this)
    }
}
