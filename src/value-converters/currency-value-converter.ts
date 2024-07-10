/**
 * Formats currencies
 * Usage: ${number|currency:'EUR':precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {calcDecimalPlace} from "../utils/numbers";

export class CurrencyValueConverter extends AbstractLocaleValueConverter {

    toView(value:number, currencyCode:string, precision:number=2, fixedPrecision:boolean = false): string {
        const options:Intl.NumberFormatOptions = {
            minimumFractionDigits: precision,
            maximumFractionDigits: fixedPrecision?precision:calcDecimalPlace(value, precision),
        }

        if (currencyCode) {
            options.style = "currency";
            options.currency = currencyCode;
        }

        return Intl.NumberFormat(this.getLocale(),options).format(value);
    }
}
