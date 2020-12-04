import {autoinject} from "aurelia-dependency-injection";

/**
 * Custom attribute for detection of element visibility
 * Usage: <div visible.delegate="_elementVisibility($event)" become-visible>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class BecomeVisibleCustomAttribute {

    private _visible:Boolean = false;
    private _checkVisibility:EventListener;

    constructor(
        private _element:Element
    ) {
        this._checkVisibility = (ev:Event) => {
            let isVisible = BecomeVisibleCustomAttribute.elementInViewport(this._element as HTMLElement);
            if (this._visible !== isVisible) {
                this._visible = isVisible;
                const ev = new CustomEvent('visible', {
                    detail: this._visible,
                    bubbles: true
                });
                this._element.dispatchEvent(ev);
            }
        }
    }

    /**
     * @see https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
     */
    static elementInViewport(el) {
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

    attached() {
        this._checkVisibility(null);
        window.addEventListener("scroll", this._checkVisibility)
    }

    detached() {
        this._checkVisibility(null);
        window.removeEventListener("scroll", this._checkVisibility)
    }
}
