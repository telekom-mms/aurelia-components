import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {EventAggregator} from "aurelia-event-aggregator";
import {NumberValueConverter} from "./number-value-converter";
import {bytesMap, getFactor} from "../utils/numbers";

/**
 * Formats bytes into the next higher byte form with a given precision.
 * Usage: ${bytes|byteFormat}
 * @author: Mike Reiche <mike@reiche.world>
 */
@autoinject()
export class ByteFormatValueConverter extends AbstractLocaleValueConverter {
    constructor(
        private readonly _numberValueConverter:NumberValueConverter,
        eventAggregator:EventAggregator
    ) {
        super(eventAggregator);
    }

    toView(bytes: number, precision: number = 2): string {
        const {factor: factor, label: label} = getFactor(bytes, bytesMap);
        if (bytes === 0) {
            return '0 ' + label
        }
        return this._numberValueConverter.toView(bytes/factor, precision) + ' ' + label;
    }
}
