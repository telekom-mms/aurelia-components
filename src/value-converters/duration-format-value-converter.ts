import 'moment-duration-format';
import * as moment from "moment";

/**
 * Formats time durations using moment.
 * Usage: ${seconds|durationFormat}
 * @author Mike Reiche <mike@reiche.world>
 */
export class DurationFormatValueConverter {

    private static _defaultFormat = "h[h] m[min] s[s]";

    /**
     * @deprecated Use instance method instead
     */
    static setDefaultFormat(format:string) {
        this._defaultFormat = format;
    }

    setDefaultFormat(format:string) {
        DurationFormatValueConverter._defaultFormat = format;
    }

    /**
     * @deprecated Use instance method instead
     */
    static getDefaultFormat() {
        return this._defaultFormat;
    }

    getDefaultFormat() {
        return DurationFormatValueConverter._defaultFormat;
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
