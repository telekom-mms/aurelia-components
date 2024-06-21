import {Toast} from "bootstrap";
import {resolve} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class ToastCustomAttribute {
    private readonly _eventListener: EventListener;
    private toast: Toast | undefined
    private readonly _element = resolve(Element)

    constructor() {
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

    dispose() {
        this._element.removeEventListener('hidden.bs.toast', this._eventListener)
        this.toast?.dispose()
        this.toast = undefined
    }
}
