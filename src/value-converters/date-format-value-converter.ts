import moment from "moment";

/**
 * Formats timestamps or strings to localized date formats
 * Usage: ${dateProperty|dateFormat}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class DateFormatValueConverter {
    private _defaultFormat = "LLL";

    setDefaultFormat(format:string) {
        this._defaultFormat = format;
    }

    getDefaultFormat() {
        return this._defaultFormat;
    }

    toView(value, format:string = this._defaultFormat): string {
        return moment(value).format(format);
    }
}
