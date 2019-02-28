import './switch.css';
import {bindable} from "aurelia-framework";

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @see https://www.w3schools.com/howto/howto_css_switch.asp
 */
export class Switch {
    @bindable() switched;
    @bindable() disabled=false;
}
