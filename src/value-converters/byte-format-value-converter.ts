import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {EventAggregator} from "aurelia-event-aggregator";
import {NumberValueConverter} from "./number-value-converter";

@autoinject()
export class ByteFormatValueConverter extends AbstractLocaleValueConverter {
    constructor(
        private readonly _numberValueConverter:NumberValueConverter,
        eventAggregator:EventAggregator
    ) {
        super(eventAggregator);
    }

    toView(bytes: number, precision: number = 2): string {
        if (bytes === 0) {
            return '0 Bytes';
        }

        const k = 1024;
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return this._numberValueConverter.toView(i, precision) + ' ' + sizes[i]
    }
}
