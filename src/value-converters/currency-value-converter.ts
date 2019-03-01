/**
 * Formats currencies
 * Usage: ${number|currency:'EUR':precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";

@autoinject()
export class CurrencyValueConverter extends AbstractLocaleValueConverter {

    toView(value, currencyCode:string, precision:number=2): string {
        return new Intl.NumberFormat(CurrencyValueConverter.locale,{
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: precision
        }).format(value);
    }
}
