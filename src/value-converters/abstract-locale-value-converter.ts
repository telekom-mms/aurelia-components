import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject()
export abstract class AbstractLocaleValueConverter {
    private _locale:string;

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
     */
    setLocale(locale:string) {
        this._locale = locale;
        this.localeChanged(locale);
    }

    /**
     * Called when the instance or system locale has changed
     */
    protected localeChanged(_locale: string) {
    }

    constructor(
        private readonly _eventAggregator:EventAggregator,
    ) {
        this._eventAggregator.subscribe('i18n:locale:changed', (payload: { newValue: string; }) => {
            this.localeChanged(payload.newValue);
        });
    }
}
