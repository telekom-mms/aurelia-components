import {Toast} from "bootstrap";
import {inject} from "aurelia";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@inject(Element)
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

    dispose() {
        this._element.removeEventListener('hidden.bs.toast', this._eventListener)
        this.toast?.dispose()
        this.toast = undefined
    }
}
