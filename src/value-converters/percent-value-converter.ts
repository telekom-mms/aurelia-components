import { AbstractLocaleValueConverter } from "./abstract-locale-value-converter";

export class PercentValueConverter extends AbstractLocaleValueConverter {
    toView(value:number, precision:number=2): string {
        return new Intl.NumberFormat(this.getLocale(),{
            style: "percent",
            maximumFractionDigits: precision,
        }).format(value);
    }
}
