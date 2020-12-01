import 'moment-duration-format';
import * as moment from "moment";

export class DurationFormatValueConverter {

    private static _defaultFormat = "h[h] m[min] s[s]";

    static setDefaultFormat(format:string) {
        this._defaultFormat = format;
    }

    static getDefaultFormat() {
        return this._defaultFormat;
    }

    toView(value: number | string, format:string = DurationFormatValueConverter._defaultFormat) {
        const duration = moment.duration(DurationFormatValueConverter.normalizeValue(value), "ms");
        // @ts-ignore
        return duration.format(format);
    }

    static normalizeValue(value: number | string) {
        if (typeof value === "string") {
            value = Number.parseInt(value);
        }
        return value;
    }
}
