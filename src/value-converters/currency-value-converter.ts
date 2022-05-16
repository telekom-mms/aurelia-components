/**
 * Formats currencies
 * Usage: ${number|currency:'EUR':precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {calcFloatingPrecision} from "../utils/numbers";

@autoinject()
export class CurrencyValueConverter extends AbstractLocaleValueConverter {

    toView(value:number, currencyCode:string, precision:number=2): string {
        const options:Intl.NumberFormatOptions = {
            minimumFractionDigits: precision,
            maximumFractionDigits: calcFloatingPrecision(value, precision),
        }

        if (currencyCode) {
            options.style = "currency";
            options.currency = currencyCode;
        }

        return Intl.NumberFormat(this.getLocale(),options).format(value);
    }
}
