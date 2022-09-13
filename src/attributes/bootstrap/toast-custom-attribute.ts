import {Toast} from "bootstrap";
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class ToastCustomAttribute {
    private readonly _eventListener: EventListener;
    private toast: Toast | undefined

    constructor(
        private readonly _element: Element,
    ) {
        this._eventListener = (_ev: Event) => {
            this._element.dispatchEvent(new CustomEvent("toast-hidden",{
                bubbles: true
            }));
        };
    }

    attached() {
        this.toast = new Toast(this._element)
        this.toast.show()
        this._element.addEventListener('hidden.bs.toast', this._eventListener)
    }

    unbind() {
        this._element.removeEventListener('hidden.bs.toast', this._eventListener)
        this.toast?.dispose()
        this.toast = undefined
    }
}
