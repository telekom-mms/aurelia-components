import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject()
export abstract class AbstractLocaleValueConverter {
    private _locale:string;
    private static _systemLocale:string = AbstractLocaleValueConverter.getSystemLocale();

    private static getSystemLocale() {
        if (navigator.language) {
            return navigator.language;
        } else {
            return navigator.languages.find(value => value.length > 0);
        }
    }

    /**
     * Returns the instance or system locale
     */
    getLocale() {
        return this._locale ? this._locale : AbstractLocaleValueConverter.getSystemLocale();
    }

    /**
     * Changes the instance locale
     * @param locale
     */
    setLocale(locale:string) {
        this._locale = locale;
        this.localeChanged(locale);
    }

    /**
     * Called when the instance or system locale has changed
     * @param locale
     */
    protected localeChanged(locale:string) {

    }

    constructor(
        private readonly _eventAggregator:EventAggregator,
    ) {
        this._eventAggregator.subscribe('i18n:locale:changed', payload => {
            AbstractLocaleValueConverter._systemLocale = payload.newValue;
            this.localeChanged(payload.newValue);
        });
    }
}
