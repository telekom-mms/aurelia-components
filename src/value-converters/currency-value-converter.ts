/**
 * Formats currencies
 * Usage: ${number|currency:'EUR':precision}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {NumberValueConverter} from "./number-value-converter";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject()
export class CurrencyValueConverter extends AbstractLocaleValueConverter {

    constructor(
        private readonly _numberValueConverter:NumberValueConverter,
        eventAggregator:EventAggregator
    ) {
        super(eventAggregator);
    }

    toView(value:number, currencyCode:string, precision:number=2): string {
        const options:Intl.NumberFormatOptions = {
            minimumFractionDigits: precision,
            maximumFractionDigits: this._numberValueConverter.calcFloatingPrecision(value, precision),
        }

        if (currencyCode) {
            options.style = "currency";
            options.currency = currencyCode;
        }

        return Intl.NumberFormat(this.getLocale(),options).format(value);
    }
}
