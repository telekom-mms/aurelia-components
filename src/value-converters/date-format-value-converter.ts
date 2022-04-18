import moment from "moment";

/**
 * Formats timestamps or strings to localized date formats
 * Usage: ${dateProperty|dateFormat}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class DateFormatValueConverter {
    private static _defaultFormat = "LLL";

    /**
     * @deprecated Use instance method {@link setDefaultFormat} instead
     */
    static setDefaultFormat(format:string) {
        this._defaultFormat = format;
    }


    setDefaultFormat(format:string) {
        DateFormatValueConverter._defaultFormat = format;
    }

    /**
     * @deprecated Use instance method {@link getDefaultFormat} instead
     */
    static getDefaultFormat() {
        return this._defaultFormat;
    }

    getDefaultFormat() {
        return DateFormatValueConverter._defaultFormat;
    }

    toView(value, format:string = DateFormatValueConverter._defaultFormat): string {
        return DateFormatValueConverter.format(value, format);
    }

    /**
     * @deprecated Use {@link toView} instead
     */
    static format(value: any, format: string = DateFormatValueConverter._defaultFormat): string {
        const moment = this.momentFromTimeValue(value);
        return moment.format(format);
    }

    /**
     * @deprecated Use instance method {@link momentFromTimeValue} instead
     * @param value
     */
    static momentFromTimeValue(value) {
        return moment(value);
    }

    momentFromTimeValue(value:any) {
        return moment(value);
    }
}
