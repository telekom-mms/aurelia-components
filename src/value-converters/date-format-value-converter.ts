import * as moment from "moment";

/**
 * Formats timestamps or strings to localized date formats
 * Usage: ${dateProperty|dateFormat}
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class DateFormatValueConverter {

    static DEFAULT_TIME_FORMAT = "LLL";

    toView(value, format): string {
        return DateFormatValueConverter.format(value, format);
    }

    static format(value: any, format: string = undefined): string {
        if (format === undefined) {
            format = this.DEFAULT_TIME_FORMAT;
        }

        let moment = this.momentFromTimeValue(value);
        return moment.format(format);
    }

    static momentFromTimeValue(value) {
        return moment(value);
    }
}
