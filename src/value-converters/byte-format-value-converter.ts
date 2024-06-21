import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";
import {resolve} from "aurelia";
import {bytesMap, getFactor} from "../utils/numbers";
import {NumberValueConverter} from "./number-value-converter";

/**
 * Formats bytes into the next higher byte form with a given precision.
 * Usage: ${bytes|byteFormat}
 * @author: Mike Reiche <mike@reiche.world>
 */
export class ByteFormatValueConverter extends AbstractLocaleValueConverter {
    private readonly _numberValueConverter = resolve(NumberValueConverter)

    toView(bytes: number, precision: number = 2): string {
        const {factor: factor, unit: label} = getFactor(bytes, bytesMap);
        if (bytes === 0) {
            return '0 ' + label
        }
        return this._numberValueConverter.toView(bytes/factor, precision) + ' ' + label;
    }
}
