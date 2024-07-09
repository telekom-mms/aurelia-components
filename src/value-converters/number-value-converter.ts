/**
 * Formats numbers
 * Usage: ${number|number:precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {calcDecimalPlace} from "../utils/numbers";

@autoinject()
export class NumberValueConverter extends AbstractLocaleValueConverter {

    toView(value:number, precision:number=2, fixedPrecision:boolean = true): string {
        return new Intl.NumberFormat(this.getLocale(),{
            maximumFractionDigits: fixedPrecision?precision:calcDecimalPlace(value, precision)
        }).format(value);
    }
}
