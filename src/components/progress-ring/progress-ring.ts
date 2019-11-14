import {bindable} from 'aurelia-templating';
import {autoinject} from 'aurelia-dependency-injection';

/**
 * Implementation of ProgressRing
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * Usage: <progress-ring stroke="2" radius="20" color="green" progress.bind="progress"></progress-ring>
 * @see https://css-tricks.com/building-progress-ring-quickly/
 */
@autoinject()
export class ProgressRing {
    private _circumference:number=0;
    private _normalizedRadius:number=0;

    @bindable color:string='white';
    @bindable stroke:number=2;
    @bindable radius:number=40;
    @bindable progress:number=0;

    constructor(
        private _element:Element
    ) {
    }

    bind() {
        this.updateSize();
        this.progressChanged(0);
    }

    private updateSize() {
        this._normalizedRadius = this.radius - this.stroke * 2;
        this._circumference = this._normalizedRadius * 2 * Math.PI;
    }

    radiusChanged(radius:number) {
        this.updateSize();
    }

    private strokeChanged(stroke:number) {
        this.updateSize();
    }

    progressChanged(percent:number) {
        const offset = this._circumference - (percent / 100 * this._circumference);
        const circle = this._element.querySelector('circle');
        circle.style.strokeDashoffset = offset.toString();
    }
}
