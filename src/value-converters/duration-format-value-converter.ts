import 'moment-duration-format';
import * as moment from "moment";

/**
 * Formats time durations using moment.
 * Usage: ${seconds|durationFormat}
 * @author Mike Reiche <mike@reiche.world>
 */
export class DurationFormatValueConverter {
    private _defaultFormat = "h[h] m[min] s[s]";

    setDefaultFormat(format:string) {
        this._defaultFormat = format;
    }

    getDefaultFormat() {
        return this._defaultFormat;
    }

    toView(value: number | string, format:string = this._defaultFormat) {
        const duration = moment.duration(DurationFormatValueConverter.normalizeValue(value), "ms");
        // @ts-ignore
        return duration.format(format);
    }

    private static normalizeValue(value: number | string) {
        if (typeof value === "string") {
            value = Number.parseInt(value);
        }
        return value;
    }
}
