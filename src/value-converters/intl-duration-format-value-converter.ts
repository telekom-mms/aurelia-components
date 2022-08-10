import {valueConverter} from 'aurelia-binding'
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {DateTimeComponents} from "../utils/time";

/**
 * Formats dates, components or milliseconds to durations.
 * Usage: ${dateProperty|durationFormat:"long"}
 * @author Mike Reiche <mike@reiche.world>
 */
@valueConverter("durationFormat")
export class IntlDurationFormatValueConverter extends AbstractLocaleValueConverter {
    private _options: { [key: string]: Intl.RelativeTimeFormatOptions } = {};
    private _separator = ", ";
    private _units:Intl.RelativeTimeFormatUnit[] = ["seconds", "minutes", "hours", "days"];

    setOptions(id: string, options: Intl.RelativeTimeFormatOptions | object) {
        this._options[id] = options;
    }

    setSeparator(separator: string) {
        this._separator = separator;
    }

    setUnits(units:Intl.RelativeTimeFormatUnit[]) {
        this._units = units;
    }

    toView(value: Date | DateTimeComponents | number = 0, optionId: string = "default"): string {

        const components = [];
        const formatter = new Intl.RelativeTimeFormat(this.getLocale(), this._options[optionId]);

        for (const unit in this._units) {
            //components.push(formatter.format(years, "year"))
        }

        return components.join(this._separator);
    }


}
