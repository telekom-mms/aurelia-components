export interface FactorMap {
    divisor: number,
    labels: string[],
}

export const bytesMap: FactorMap = {
    divisor: 1024,
    labels: ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
}

export const kiloMap: FactorMap = {
    divisor: 1000,
    labels: ['', 'k', 'M']
}

export function getFactor(value: number, map:FactorMap) {
    let index = 0;
    if (Math.abs(value) > 0) {
        index = Math.floor(Math.log(value) / Math.log(map.divisor));
        if (index > map.labels.length) {
            index = map.labels.length-1;
        }
    }

    return {factor: Math.pow(map.divisor, index), label: map.labels[index]};
}
