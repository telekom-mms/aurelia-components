import {autoinject} from "aurelia-dependency-injection";
import {AbstractLocaleValueConverter} from "./abstract-locale-value-converter";

@autoinject()
export class ByteFormatValueConverter extends AbstractLocaleValueConverter {
    toView(bytes: number, precision: number = 2): string {
        if (bytes === 0) {
            return '0 Bytes';
        }

        const k = 1024;
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

        precision = precision < 0 ? 0 : precision;

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(precision)).toLocaleString(ByteFormatValueConverter.getLocale()) + ' ' + sizes[i];
    }
}
