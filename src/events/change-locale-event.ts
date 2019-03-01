/**
 * Event aggregator event for updating locales.
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class ChangeLocaleEvent {
    private _locale:string;

    static create() {
        return new ChangeLocaleEvent();
    }

    setLocale(locale:string) {
        this._locale = locale;
        return this;
    }

    get locale() {
        return this._locale;
    }

    static get NAME():string {
        return 'locale-changed'
    }
}
