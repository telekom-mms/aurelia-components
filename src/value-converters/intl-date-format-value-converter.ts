import {valueConverter} from 'aurelia-binding'
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";

/**
 * Formats timestamps or strings to localized date formats
 * Usage: ${dateProperty|dateFormat:"long"}
 * @author Mike Reiche <mike@reiche.world>
 */
@valueConverter("dateFormat")
export class IntlDateFormatValueConverter extends AbstractLocaleValueConverter {
    private _options: { [key: string]: Intl.DateTimeFormatOptions } = {};

    setOptions(id: string, options: Intl.DateTimeFormatOptions | object) {
        this._options[id] = options;
    }

    toView(value: Date | string | number = 0, optionId: string = null): string {
        if (!(value instanceof Date)) {
            value = new Date(value);
        }
        return Intl.DateTimeFormat(this.getLocale(), this._options[optionId]).format(value);
    }
}
