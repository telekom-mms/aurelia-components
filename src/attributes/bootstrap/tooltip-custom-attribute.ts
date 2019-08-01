import $ from 'jquery';
import 'bootstrap/js/src/tooltip';
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class TooltipCustomAttribute {
    constructor(
        private _element:Element,
    ) {

    }
    bind() {
        $(this._element).tooltip();
    }
    unbind() {
        $(this._element).tooltip('dispose');
    }
}
