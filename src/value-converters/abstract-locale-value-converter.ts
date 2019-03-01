import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {ChangeLocaleEvent} from "../events/change-locale-event";

@autoinject()
export class AbstractLocaleValueConverter {
    private static _locale:string='en';

    protected static get locale() {
        return AbstractLocaleValueConverter._locale;
    }

    constructor(
        private _eventAggregator:EventAggregator,
    ) {
        this._eventAggregator.subscribe(ChangeLocaleEvent.NAME, (event:ChangeLocaleEvent)=>{
            AbstractLocaleValueConverter._locale = event.locale;
        });
    }
}
