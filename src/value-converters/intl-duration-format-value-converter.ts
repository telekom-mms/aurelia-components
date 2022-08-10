import {valueConverter} from 'aurelia-binding'
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {DateTimeComponents, Milliseconds, toMilliseconds} from "../utils/time";

/**
 * Formats dates, components or milliseconds to human readable durations.
 * Usage: ${dateProperty|durationFormat}
 * @author Mike Reiche <mike@reiche.world>
 */
@valueConverter("durationFormat")
export class IntlDurationFormatValueConverter extends AbstractLocaleValueConverter {
    private _options: { [key: string]: Intl.RelativeTimeFormatOptions } = {};
    private _separators: { [key: string]: string } = {"default": ", "};
    private _units: { [key: string]: Intl.RelativeTimeFormatUnit[] } = {"default": ["days", "hours", "minutes", "seconds"]};
    private readonly _partsMap: Record<Intl.RelativeTimeFormatUnit, Milliseconds> = {
        "year": Milliseconds.YEAR,
        "years": Milliseconds.YEAR,
        "quarter": Milliseconds.QUARTER,
        "quarters": Milliseconds.QUARTER,
        "month": Milliseconds.MONTH,
        "months": Milliseconds.MONTH,
        "week": Milliseconds.WEEK,
        "weeks": Milliseconds.WEEK,
        "day": Milliseconds.DAY,
        "days": Milliseconds.DAY,
        "hour": Milliseconds.HOUR,
        "hours": Milliseconds.HOUR,
        "minute": Milliseconds.MINUTE,
        "minutes": Milliseconds.MINUTE,
        "second": Milliseconds.SECOND,
        "seconds": Milliseconds.SECOND
    }

    /**
     * Set formatting options for the id.
     * @param id
     * @param options
     */
    setOptions(id: string, options: Intl.RelativeTimeFormatOptions | object) {
        this._options[id] = options;
    }

    /**
     * Set the seperator for the option id.
     * @param id
     * @param separator
     */
    setSeparators(id: string, separator:string) {
        this._separators[id] = separator;
    }

    /**
     * Set units for the option id. Units should be ordered from highest to lowest.
     * @param id
     * @param units
     */
    setUnits(id: string, units:Intl.RelativeTimeFormatUnit[]) {
        this._units[id] = units;
    }

    /**
     * Formats a date
     * @param value The value to format.
     * @param optionId Given option id for formatting, units and separator.
     */
    toView(value: Date|DateTimeComponents|number = 0, optionId: string = "default"): string {
        const formatter = new Intl.RelativeTimeFormat(this.getLocale(), this._options[optionId]);

        if (value instanceof Date) {
            value = value.getTime() - new Date().getTime();
        } else if (typeof value !== "number") {
            value = toMilliseconds(value);
        }

        const units = this._units[!this._units[optionId]?"default":optionId]
        const separator = this._separators[!this._separators[optionId]?"default":optionId];

        const multiplier = value < 0 ? -1 :1;
        value = Math.abs(value);

        const unitFormats = [];
        for (const unit of units) {
            const unitMs = this._partsMap[unit];
            const amount = Math.floor(value/unitMs);
            if (amount > 0) {
                unitFormats.push(formatter.formatToParts(amount*multiplier, unit))
            }
            value -= amount * unitMs;

            if (value <= 0) {
                break;
            }
        }

        // Remove duplicate literals
        // if (unitFormats.length > 1) {
        //     const firstUnitFormat:object[] = unitFormats[0];
        //     for (const formatPart of firstUnitFormat) {
        //         if (formatPart["type"] === "literal") {
        //             const formatPartToRemove = formatPart["value"];
        //             for (let s = 1; s < unitFormats.length; ++s) {
        //                 const otherUnitFormat:object[] = unitFormats[s];
        //                 for (const formatPart of otherUnitFormat) {
        //                     if (formatPart["value"] === formatPartToRemove) {
        //                         otherUnitFormat.splice(otherUnitFormat.indexOf(formatPart), 1);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        return unitFormats.map(unitFormat => unitFormat.map(part => part["value"]).join("")).join(separator);
    }
}
