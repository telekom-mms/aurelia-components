/**
 * Formats numbers
 * Usage: ${number|number:precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {calcFloatingPrecision} from "../utils/numbers";

@autoinject()
export class NumberValueConverter extends AbstractLocaleValueConverter {

    toView(value:number, precision:number=2, fixedPrecision:boolean = true): string {
        return new Intl.NumberFormat(this.getLocale(),{
            maximumFractionDigits: fixedPrecision?precision:calcFloatingPrecision(value, precision)
        }).format(value);
    }
}
