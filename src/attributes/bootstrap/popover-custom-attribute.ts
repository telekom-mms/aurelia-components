import $ from 'jquery';
import 'bootstrap/js/src/popover';
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Christoph Reinsch <christoph.reinsch@t-systems.com>
 */
@autoinject()
export class PopoverCustomAttribute {
    constructor(
        private readonly _element:Element,
    ) {
    }

    bind() {
        $(this._element).popover();
    }

    unbind() {
        $(this._element).popover('dispose');
    }
}
