import 'moment-duration-format';
import * as moment from "moment";

export class DurationFormatValueConverter {

    toView(value: number | string, format:string) {
        const duration = moment.duration(DurationFormatValueConverter.normalizeValue(value));
        if (!format) {
            format = "h[h] m[min] s[s]";
        }
        return duration.format(format);
    }

    static normalizeValue(value: number | string) {
        if (typeof value === "string") {
            value = Number.parseInt(value);
        }
        return value;
    }
}
