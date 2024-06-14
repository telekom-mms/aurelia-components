import {IEventAggregator, resolve} from "aurelia";

/**
 * @inject() and @valueConverter() wont work with abstract classes
 * @see https://discourse.aurelia.io/t/error-injecting-singletons-in-aurelia-2/5444/12
 */
export class AbstractLocaleValueConverter {
    private _locale:string;
    private readonly _eventAggregator = resolve(IEventAggregator)

    constructor() {
        this._eventAggregator.subscribe('i18n:locale:changed', (payload: { newValue: string; }) => {
            this.localeChanged(payload.newValue);
        });
    }

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
}
