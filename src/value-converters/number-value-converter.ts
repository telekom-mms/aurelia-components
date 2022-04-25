/**
 * Formats numbers
 * Usage: ${number|number:precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";

@autoinject()
export class NumberValueConverter extends AbstractLocaleValueConverter {

    toView(value:number, precision:number=2, fixedPrecision:boolean = true): string {
        return new Intl.NumberFormat(this.getLocale(),{
            maximumFractionDigits: fixedPrecision?precision:this.calcFloatingPrecision(value, precision)
        }).format(value);
    }

    public calcFloatingPrecision(value:number, precision:number) {
        let realPrecision = precision;
        const absValue = Math.abs(value);
        while (absValue > 0 && absValue < 1/Math.pow(10, realPrecision)) {
            realPrecision += precision;
        }
        return realPrecision;
    }
}
