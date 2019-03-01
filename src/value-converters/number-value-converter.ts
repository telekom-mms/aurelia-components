/**
 * Formats numbers
 * Usage: ${number|number:precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";

@autoinject()
export class NumberValueConverter extends AbstractLocaleValueConverter {

    toView(value, precision:number=2): string {
        return new Intl.NumberFormat(NumberValueConverter.locale,{
            maximumFractionDigits: precision
        }).format(value);
    }
}
