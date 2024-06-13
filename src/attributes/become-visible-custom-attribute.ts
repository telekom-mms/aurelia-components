import {customAttribute, inject} from "aurelia";
/**
 * Custom attribute for detection of element visibility
 * Usage: <div visible.delegate="_elementVisibility($event)" become-visible>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */

@inject(Element)
@customAttribute('become-visible')
export class BecomeVisibleCustomAttribute {
    private readonly _observer: IntersectionObserver

    constructor(
        private readonly _element: Element
    ) {
        const _checkVisibility: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                const ev = new CustomEvent('visible', {
                    detail: entry.isIntersecting,
                    bubbles: true
                });
                this._element.dispatchEvent(ev);
            })
        }
        this._observer = new window.IntersectionObserver(_checkVisibility)
    }

    attached() {
        this._observer.observe(this._element)
    }

    dispose() {
        this._observer.unobserve(this._element)
    }
}
