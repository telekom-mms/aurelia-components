/**
 * Formats currencies
 * Usage: ${number|currency:'EUR':precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";

@autoinject()
export class CurrencyValueConverter extends AbstractLocaleValueConverter {

    toView(value:any, currencyCode:string, precision:number=2): string {
        if (!value) {
            return value;
        }

        let realPrecision = precision;
        while (value > 0 && value < 1/Math.pow(10, realPrecision)) {
            realPrecision += precision;
        }

        return new Intl.NumberFormat(CurrencyValueConverter.locale,{
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: realPrecision
        }).format(value);
    }
}
