import moment from "moment";

/**
 * Formats timestamps or strings to localized date formats
 * Usage: ${dateProperty|dateFormat}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class DateFormatValueConverter {

    /**
     * @deprecated Use {@link getDefaultFormat} instead
     */
    static DEFAULT_TIME_FORMAT = "LLL";

    private static _defaultFormat = DateFormatValueConverter.DEFAULT_TIME_FORMAT;

    static setDefaultFormat(format:string) {
        this._defaultFormat = format;
    }

    static getDefaultFormat() {
        return this._defaultFormat;
    }

    toView(value, format:string = DateFormatValueConverter._defaultFormat): string {
        return DateFormatValueConverter.format(value, format);
    }

    static format(value: any, format: string = DateFormatValueConverter._defaultFormat): string {
        let moment = this.momentFromTimeValue(value);
        return moment.format(format);
    }

    static momentFromTimeValue(value) {
        return moment(value);
    }
}
