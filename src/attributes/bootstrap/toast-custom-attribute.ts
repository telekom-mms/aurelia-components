import $ from 'jquery';
import 'bootstrap/js/src/toast';
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class ToastCustomAttribute {
    private _eventListener:EventListener;
    constructor(
        private _element:Element,
    ) {
        this._eventListener = (ev:Event) => {
            this._element.dispatchEvent(new CustomEvent("toast-hidden",{
                bubbles: true
            }));
        };
    }
    bind() {
        const $element = $(this._element);
        $element.toast('show');
        $element.on("hidden.bs.toast", this._eventListener);
    }
    unbind() {
        const $element = $(this._element);
        $element.off("hidden.bs.toast", this._eventListener);
        $element.toast('dispose');
    }
}
