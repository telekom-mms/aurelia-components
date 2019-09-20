import './switch.css';
import {bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';

/**
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @see https://www.w3schools.com/howto/howto_css_switch.asp
 */
export class Switch {
    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    switched;

    @bindable()
    disabled=false;

    @bindable()
    useId:string;

    @bindable()
    useName:string;
}
