/**
 * Maps factors of their divisors to the given labels.
 */
export interface FactorMap {
    divisor: number,
    labels: string[],
}

/**
 * Factor map for ISO byte suffixes.
 * Example:
 *  1,024 -> 1 KiB
   */
export const bytesMap: FactorMap = {
    divisor: 1024,
    labels: ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
}

/**
 * Factor map for common kilo suffixes.
 * Example:
 *  1,000 -> 1k
 *  2,000,000 -> 2M
 */
export const kiloMap: FactorMap = {
    divisor: 1000,
    labels: ['', 'k', 'M']
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
    label: string
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
        if (index > map.labels.length) {
            index = map.labels.length-1;
        }
    }

    return {
        factor: Math.pow(map.divisor, index),
        label: map.labels[index]
    };
}
