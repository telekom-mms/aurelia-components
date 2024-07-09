/**
 * Maps factors of their divisors to the given labels.
 */
export interface FactorMap {
    divisor: number,
    units: string[],
}

/**
 * Factor map for ISO byte suffixes.
 * Example:
 *  1,024 -> 1 KiB
   */
export const bytesMap: FactorMap = {
    divisor: 1024,
    units: ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
}

/**
 * Factor map for common kilo suffixes.
 * Example:
 *  1,000 -> 1k
 *  2,000,000 -> 2M
 */
export const kiloMap: FactorMap = {
    divisor: 1000,
    units: ['', 'k', 'M']
}

/**
 * Calculated factor for a given {@link FactorMap}.
 */
export interface Factor {
    /**
     * The values calculated factor for the corresponding label.
     */
    factor: number,
    /**
     * The corresponding label for the factor.
     */
    unit: string
}

/**
 * Calculates a factor for a given value and {@link FactorMap}.
 * @param value The numeric value to calculate a factor for (>= 0).
 * @param map The map to be used.
 * @return The calculated {@link Factor}
 */
export function getFactor(value: number, map:FactorMap): Factor {
    let index = 0;

    if (Math.abs(value) > 0) {
        index = Math.floor(Math.log(value) / Math.log(map.divisor));
        if (index > map.units.length) {
            index = map.units.length-1;
        }
    }

    return {
        factor: Math.pow(map.divisor, index),
        unit: map.units[index]
    };
}

/**
 * Rounds a number to a specified precision.
 * @see https://gist.github.com/djD-REK/2e347f5532bb22310daf450f03ec6ad8
 * @param value Value to round.
 * @param precision Target precision.
 * @return Round value
 */
export function round(value:number, precision:number) {
    const factorOfTen = Math.pow(10, precision);
    return Math.round(value * factorOfTen) / factorOfTen;
}


/**
 * @deprecated Use {@link calcDecimalPlace()} instead
 * @param value
 * @param minPrecision
 */
export function calcFloatingPrecision(value:number, minPrecision:number) {
    return calcDecimalPlace(value, minPrecision)
}

/**
 * Calculates a floating precision if the value is smaller than the requested precision
 * @param value The given value
 * @param minPrecision Minimal precision value
 * @return Fitting precision
 */
export function calcDecimalPlace(value: number, minPrecision: number) {
    if (minPrecision <= 0) {
        return 0
    }
    let realPrecision = 1;
    const absValue = Math.abs(value);

    if (absValue < 1/Math.pow(10, realPrecision)) {
        do {
            realPrecision++;
        } while (absValue < 1/Math.pow(10, realPrecision))

        realPrecision += minPrecision - 1
    } else {
        realPrecision = minPrecision
    }

    return realPrecision;
}
