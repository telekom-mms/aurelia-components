import $ from 'jquery';
import 'bootstrap/js/src/dropdown';
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class DropdownCustomAttribute {
    constructor(
        private readonly _element:Element,
    ) {
    }

    bind() {
        $(this._element).dropdown();
    }

    unbind() {
        $(this._element).dropdown('dispose');
    }
}
