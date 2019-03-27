import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject()
export class AbstractLocaleValueConverter {
    private static _locale:string='en';

    protected static get locale() {
        return AbstractLocaleValueConverter._locale;
    }

    constructor(
        private _eventAggregator:EventAggregator,
    ) {
        this._eventAggregator.subscribe('i18n:locale:changed', payload => {
            AbstractLocaleValueConverter._locale = payload.newValue;
        });
    }
}
