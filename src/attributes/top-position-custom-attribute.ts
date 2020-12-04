import {autoinject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";
import {bindingMode} from "aurelia-binding";

/**
 * Custom attribute implementing sticky elements based on vertical scroll position (sticky headers)
 * Usage: <div reached.delegate="_elementReached($event)" top-position="offset:10">
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class TopPositionCustomAttribute {
    private readonly _checkVisibility:EventListener;
    private _reached: boolean = false;
    @bindable({bindingMode:bindingMode.toView}) offset: string;
    private _offset:number;

    constructor(
        private _element:Element
    ) {
        const htmlElement = this._element as HTMLElement;
        let windowYOffset = 0;
        this._checkVisibility = (ev:Event) => {
            if (htmlElement.getBoundingClientRect().top < this._offset && this._reached == false) {
                this._reached = true;
                this._dispatchEvent();
                windowYOffset = window.pageYOffset;
            } else if (window.pageYOffset < windowYOffset && this._reached == true) {
                this._reached = false;
                this._dispatchEvent();
            }
        }
    }

    private _dispatchEvent() {
        const ev = new CustomEvent('reached', {
            detail: this._reached,
            bubbles: true
        });
        this._element.dispatchEvent(ev);
    }

    offsetChanged() {
        this._offset = Number.parseInt(this.offset);
    }

    attached() {
        window.addEventListener("scroll", this._checkVisibility)
    }

    detached() {
        window.removeEventListener("scroll", this._checkVisibility)
    }
}
