import {bindable, BindingMode, IEventAggregator, resolve} from "aurelia";

type LocaleChangedEventPayload = {
    oldLocale: string
    newLocale: string
}

/**
 * @inject() and @valueConverter() wont work with abstract classes
 * @see https://discourse.aurelia.io/t/error-injecting-singletons-in-aurelia-2/5444/12
 */
export class AbstractLocaleValueConverter {
    @bindable({mode: BindingMode.toView})
    private locale: string
    private _fixedLocale: boolean = false
    private readonly _eventAggregator = resolve(IEventAggregator)

    constructor() {
        this._eventAggregator.subscribe('i18n:locale:changed', (payload: LocaleChangedEventPayload) => {
            if (!this._fixedLocale) {
                this.setLocale(payload.newLocale)
                this._fixedLocale = false
            }
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
        if (!this.locale) {
            this.setLocale(AbstractLocaleValueConverter.getSystemLocale())
        }
        return this.locale
    }

    /**
     * Changes the instance locale
     */
    setLocale(locale: string) {
        this.locale = locale
        this._fixedLocale = true
    }

    public localeChanged(newValue: string, oldValue: string) {

    }
}
