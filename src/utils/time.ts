export interface TimeComponents {
    years?:number,
    months?:number,
    days?:number,
    hours?:number;
    minutes?:number;
    seconds?:number;
    ms?:number;
}

export function addTimedelta(date: Date, components: TimeComponents) {
    return new Date(
        date.getFullYear()+(components.years||0),
        date.getMonth()+(components.months||0),
        date.getDate()+(components.days||0),
        date.getHours()+(components.hours||0),
        date.getMinutes()+(components.minutes||0),
        date.getSeconds()+(components.seconds||0),
        date.getMilliseconds()+(components.ms||0)
    );
}

export function subtractTimedelta(date: Date, components: TimeComponents) {
    return addTimedelta(date, negateTimeComponents(components));
}

export function negateTimeComponents(components: TimeComponents) {
    const negComponents:TimeComponents = {}
    for (const key in components) {
        if (components[key]) {
            negComponents[key] = components[key] * -1;
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
        newDate.setHours(components.hours>0 ? Math.floor(newDate.getHours() / components.hours) * components.hours : components.hours);
    }
    if (components.minutes >= 0) {
        newDate.setMinutes(components.minutes > 0 ? Math.floor(newDate.getMinutes() / components.minutes) * components.minutes : components.minutes);
    }
    if (components.seconds >= 0) {
        newDate.setSeconds(components.seconds > 0 ? Math.floor(newDate.getSeconds() / components.seconds) * components.seconds : components.seconds);
    }
    if (components.ms >= 0) {
        newDate.setMilliseconds(components.ms > 0 ? Math.floor(newDate.getSeconds() / components.ms) * components.ms : components.ms);
    }
    return newDate
}

enum Seconds {
    MINUTE=60,
    HOUR=MINUTE*60,
    DAY=HOUR*24,
    MONTH=DAY*30,
    YEAR=MONTH*12,
}

export function toMilliseconds(components: TimeComponents) {
    let ms = 0;

    ms += (components.ms||0);
    ms += (components.seconds||0)*1000;
    ms += (components.minutes||0)*Seconds.MINUTE*1000;
    ms += (components.hours||0)*Seconds.HOUR*1000;
    ms += (components.days||0)*Seconds.DAY*1000;
    ms += (components.months||0)*Seconds.MONTH*1000;
    ms += (components.years||0)*Seconds.YEAR*1000;

    return ms
}

export function toSeconds(components: TimeComponents) {
    return toMilliseconds(components) / 1000;
}
