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
        return new Intl.NumberFormat(this.getLocale(),{
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: this._numberValueConverter.calcFloatingPrecision(value, precision)
        }).format(value);
    }
}
