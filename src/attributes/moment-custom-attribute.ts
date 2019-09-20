import {autoinject} from 'aurelia-dependency-injection';
import * as moment from "moment";
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {UiUpdateEvent} from "../events/ui-update-event";
import {DateFormatValueConverter} from "../value-converters/date-format-value-converter";

/**
 * Creates relative date formats and refreshs them by global interval
 * Usage: <span moment.bind="timeProperty">&nbsp;</span>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class MomentCustomAttribute {
    private value;
    private _subscriber: Subscription;

    constructor(
        private _element: Element,
        private _eventAggregator: EventAggregator
    ) {
    }

    bind(): void {
        this.relativeTimeFormat();
        this._subscriber = this._eventAggregator.subscribe(UiUpdateEvent.NAME, (event) => this.relativeTimeFormat());
    }

    unbind(): void {
        this._subscriber.dispose();
    }

    relativeTimeFormat(): void {
        let relativeTimeString: string = '';

        if (this.value) {
            let referenceTime = DateFormatValueConverter.momentFromTimeValue(this.value);
            let now = moment();
            let daysDiff = now.diff(referenceTime, 'days');
            if (daysDiff >= 1) {
                relativeTimeString = referenceTime.calendar(now, {
                    sameElse: DateFormatValueConverter.DEFAULT_TIME_FORMAT
                });
            } else {
                relativeTimeString = referenceTime.fromNow();
            }
        }
        this._element.innerHTML = relativeTimeString;
    }
}
