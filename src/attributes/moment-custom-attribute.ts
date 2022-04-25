import {autoinject} from 'aurelia-dependency-injection';
import moment from "moment";
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {UiUpdateEvent} from "../events/ui-update-event";
import {DateFormatValueConverter} from "../value-converters/date-format-value-converter";

/**
 * Creates relative date formats and refreshes them by {@link UiUpdateEvent}
 * Usage: <span moment.bind="timeProperty">&nbsp;</span>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class MomentCustomAttribute {
    private value;
    private _subscriber: Subscription;

    constructor(
        private readonly _element: Element,
        private readonly _eventAggregator: EventAggregator,
        private readonly _dateFormatValueConverter: DateFormatValueConverter,
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
            const referenceTime = moment(this.value);
            const now = moment();
            const daysDiff = now.diff(referenceTime, 'days');
            if (daysDiff >= 1) {
                relativeTimeString = referenceTime.calendar(now, {
                    sameElse: this._dateFormatValueConverter.getDefaultFormat()
                });
            } else {
                relativeTimeString = referenceTime.fromNow();
            }
        }
        this._element.innerHTML = relativeTimeString;
    }
}
