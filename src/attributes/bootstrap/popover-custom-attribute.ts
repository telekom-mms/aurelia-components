import $ from 'jquery';
import 'bootstrap/js/src/tooltip';
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Christoph Reinsch <christoph.reinsch@t-systems.com>
 */
@autoinject()
export class PopoverCustomAttribute {
    constructor(
        private _element:Element,
    ) {

    }
    bind() {
        $(this._element).popover('show');
    }
    unbind() {
        $(this._element).popover('dispose');
    }
}
