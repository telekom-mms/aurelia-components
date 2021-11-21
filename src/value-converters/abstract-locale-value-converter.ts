import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject()
export abstract class AbstractLocaleValueConverter {
    private static _locale:string = AbstractLocaleValueConverter.getDefaultLocale();

    public static setLocale(locale:string) {
        AbstractLocaleValueConverter._locale = locale;
    }

    protected static getLocale() {
        return AbstractLocaleValueConverter._locale;
    }

    private static getDefaultLocale() {
        if (navigator.language) {
            return navigator.language;
        } else {
            return navigator.languages.find(value => value.length > 0);
        }
    }

    constructor(
        private _eventAggregator:EventAggregator,
    ) {
        this._eventAggregator.subscribe('i18n:locale:changed', payload => {
            AbstractLocaleValueConverter._locale = payload.newValue;
        });
    }
}
