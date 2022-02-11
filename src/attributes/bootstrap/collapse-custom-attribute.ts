import $ from 'jquery';
import 'bootstrap/js/src/collapse';
import {autoinject} from "aurelia-dependency-injection";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class CollapseCustomAttribute {
    constructor(
        private readonly _element:Element,
    ) {
    }

    bind() {
        $(this._element).collapse();
    }

    unbind() {
        $(this._element).collapse('dispose');
    }
}
