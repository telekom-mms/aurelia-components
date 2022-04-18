import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject()
export abstract class AbstractLocaleValueConverter {
    private static _locale:string;

    /**
     * @deprecated Use instance methods instead
     * @param locale
     */
    public static setLocale(locale:string) {
        AbstractLocaleValueConverter._locale = locale;
    }

    /**
     * @deprecated Use instance methods instead
     * @protected
     */
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

    protected setLocale(locale:string) {
        AbstractLocaleValueConverter._locale = locale;
    }

    protected getLocale() {
        return AbstractLocaleValueConverter._locale;
    }

    constructor(
        private readonly _eventAggregator:EventAggregator,
    ) {
        this.setLocale(AbstractLocaleValueConverter.getDefaultLocale());

        this._eventAggregator.subscribe('i18n:locale:changed', payload => {
            this.setLocale(payload.newValue);
        });
    }
}
