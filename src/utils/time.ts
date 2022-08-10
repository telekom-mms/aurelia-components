export interface TimeComponents {
    hours?:number;
    minutes?:number;
    seconds?:number;
    ms?:number;
}

export interface DateComponents {
    years?:number,
    months?:number,
    weeks?:number,
    days?:number,
}

export interface DateTimeComponents extends DateComponents, TimeComponents {

}

export function addTimedelta(date: Date, components: DateTimeComponents) {
    return new Date(
        date.getUTCFullYear()+(components.years||0),
        date.getUTCMonth()+(components.months||0),
        date.getUTCDate()+(components.days||0),
        date.getUTCHours()+(components.hours||0),
        date.getUTCMinutes()+(components.minutes||0),
        date.getUTCSeconds()+(components.seconds||0),
        date.getUTCMilliseconds()+(components.ms||0)
    );
}

export function subtractTimedelta(date: Date, components: DateTimeComponents) {
    return addTimedelta(date, negateTimeComponents(components));
}

export function negateTimeComponents(components: DateTimeComponents) {
    const negComponents:TimeComponents = {}
    for (const key in components) {
        if (components[key]) {
            negComponents[key] = -components[key];
        }
    }
    return negComponents;
}

/**
 * Normalizes the time of a given date to full divisors of the components.
 * Example:
 *  hours: 4 -> 0, 4, 8, 12, 16, 20, 24
 *  minutes: 5 -> 0, 5, 10, 15, 20 ...
 *  seconds: 0 -> 0
 *  date: 13:44:33 -> 12:40:00
 */
export function normalizeTime(date: Date, components: TimeComponents) {
    const newDate = new Date(date);
    if (components.hours >= 0) {
        newDate.setUTCHours(components.hours>0 ? Math.floor(newDate.getUTCHours() / components.hours) * components.hours : components.hours);
    }
    if (components.minutes >= 0) {
        newDate.setUTCMinutes(components.minutes > 0 ? Math.floor(newDate.getUTCMinutes() / components.minutes) * components.minutes : components.minutes);
    }
    if (components.seconds >= 0) {
        newDate.setUTCSeconds(components.seconds > 0 ? Math.floor(newDate.getUTCSeconds() / components.seconds) * components.seconds : components.seconds);
    }
    if (components.ms >= 0) {
        newDate.setUTCMilliseconds(components.ms > 0 ? Math.floor(newDate.getUTCMilliseconds() / components.ms) * components.ms : components.ms);
    }
    return newDate
}

enum Milliseconds {
    SECOND=1000,
    MINUTE=SECOND*60,
    HOUR=MINUTE*60,
    DAY=HOUR*24,
    WEEK=DAY*7,
    MONTH=DAY*30,
    YEAR=DAY*365,
}

export function toMilliseconds(components: DateTimeComponents) {
    let ms = 0;

    ms += (components.ms||0);
    ms += (components.seconds||0)*Milliseconds.SECOND;
    ms += (components.minutes||0)*Milliseconds.MINUTE;
    ms += (components.hours||0)*Milliseconds.HOUR;
    ms += (components.days||0)*Milliseconds.DAY;
    ms += (components.weeks||0)*Milliseconds.WEEK;
    ms += (components.months||0)*Milliseconds.MONTH;
    ms += (components.years||0)*Milliseconds.YEAR;

    return ms;
}

export function toSeconds(components: DateTimeComponents) {
    return toMilliseconds(components) / 1000;
}

export function calcDuration(time: DateTimeComponents|Date|number):DateTimeComponents {
    const refDate = new Date();
    let durationDate;
    if (time instanceof Date) {
        durationDate = time
    } else {
        if (typeof time !== "number") {
            time = toMilliseconds(time);
        }
        durationDate = new Date(refDate.getTime()+time);
    }

    const components:DateTimeComponents = {};
    let value = refDate.getUTCFullYear()+durationDate.getUTCFullYear();
    if (value!==0) {
        components.years = value;
    }

    value = refDate.getUTCMonth()+durationDate.getUTCMonth();
    if (value!==0) {
        components.months = value;
    }

    value = refDate.getUTCDate()+durationDate.getUTCDate();
    if (value!==0) {
        components.days = value;
    }

    value = refDate.getUTCHours()+durationDate.getUTCHours();
    if (value!==0) {
        components.hours = value;
    }

    value = refDate.getUTCMinutes()+durationDate.getUTCMinutes();
    if (value!==0) {
        components.minutes = value;
    }

    value = refDate.getUTCSeconds()+durationDate.getUTCSeconds();
    if (value!==0) {
        components.seconds = value;
    }

    value = refDate.getUTCMilliseconds()+durationDate.getUTCMilliseconds();
    if (value!==0) {
        components.ms = value;
    }

    return components;
}
