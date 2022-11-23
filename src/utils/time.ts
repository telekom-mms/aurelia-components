enum ConcreteTimeComponents {
    hours = 0,
    minutes,
    seconds,
    ms
    // update ConcreteDateComponents.years if adding here
}

export type TimeComponents = {
    [Property in keyof typeof ConcreteTimeComponents]?: number
}

enum ConcreteDateComponents {
    years = ConcreteTimeComponents.ms + 1,
    months,
    days
}

export type DateComponents = {
    [Property in keyof typeof ConcreteDateComponents]?: number
}

const ConcreteDateTimeComponents = {...ConcreteTimeComponents, ...ConcreteDateComponents}

export type DateTimeComponents = {
    [Property in keyof typeof ConcreteDateTimeComponents]?: number
}

export function addTimedelta(date: Date, components: DateTimeComponents): Date {
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

export function subtractTimedelta(date: Date, components: DateTimeComponents): Date {
    return addTimedelta(date, negate(components));
}

/**
 * @deprecated Use {@link negate} instead
 */
export function negateTimeComponents(components: DateTimeComponents): TimeComponents {
    return negate(components);
}

export function negate(components: DateTimeComponents): DateTimeComponents {
    const negComponents: DateTimeComponents = {}
    for (const key in components) {
        negComponents[key] = ConcreteDateTimeComponents.hasOwnProperty(key) ? -components[key] : components[key]
    }
    return negComponents;
}

/**
 * Sets the date components for a given date and returns a new one.
 * @param date Reference date
 * @param components Components to set
 */
export function setComponents(date: Date, components: DateTimeComponents): Date {
    const newDate = new Date(date);
    if (components.years !== undefined) {
        newDate.setFullYear(components.years);
    }
    if (components.months !== undefined) {
        newDate.setMonth(components.months);
    }
    if (components.days !== undefined) {
        newDate.setDate(components.days);
    }
    if (components.hours !== undefined) {
        newDate.setHours(components.hours);
    }
    if (components.minutes !== undefined) {
        newDate.setMinutes(components.minutes);
    }
    if (components.seconds !== undefined) {
        newDate.setSeconds(components.seconds);
    }
    if (components.ms !== undefined) {
        newDate.setMilliseconds(components.ms);
    }
    return newDate;
}

/**
 * Normalizes the time of a given date to full divisors of the components.
 * Example:
 *  hours: 4 -> 0, 4, 8, 12, 16, 20, 24
 *  minutes: 5 -> 0, 5, 10, 15, 20 ...
 *  seconds: 0 -> 0
 *  date: 13:44:33 -> 12:40:00
 */
export function normalizeTime(date: Date, components: TimeComponents): Date {
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
        newDate.setMilliseconds(components.ms > 0 ? Math.floor(newDate.getMilliseconds() / components.ms) * components.ms : components.ms);
    }
    return newDate
}

export enum Milliseconds {
    SECOND=1000,
    MINUTE=SECOND*60,
    HOUR=MINUTE*60,
    DAY=HOUR*24,
    WEEK=DAY*7,
    MONTH=DAY*30,
    QUARTER=MONTH*3,
    YEAR=DAY*365,
}

export function toMilliseconds(components: DateTimeComponents) {
    let ms = 0;

    ms += (components.ms||0);
    ms += (components.seconds||0)*Milliseconds.SECOND;
    ms += (components.minutes||0)*Milliseconds.MINUTE;
    ms += (components.hours||0)*Milliseconds.HOUR;
    ms += (components.days||0)*Milliseconds.DAY;
    ms += (components.months||0)*Milliseconds.MONTH;
    ms += (components.years||0)*Milliseconds.YEAR;

    return ms;
}

export function toSeconds(components: DateTimeComponents) {
    return toMilliseconds(components) / 1000;
}

export function calcDuration(startDate:Date, endDate:Date):DateTimeComponents {
    const components:DateTimeComponents = {};
    let value = endDate.getFullYear()-startDate.getFullYear();
    if (value!==0) {
        components.years = value;
    }

    value = endDate.getMonth()-startDate.getMonth();
    if (value!==0) {
        components.months = value;
    }

    value = endDate.getDate()-startDate.getDate();
    if (value!==0) {
        components.days = value;
    }

    value = endDate.getHours()-startDate.getHours();
    if (value!==0) {
        components.hours = value;
    }

    value = endDate.getMinutes()-startDate.getMinutes();
    if (value!==0) {
        components.minutes = value;
    }

    value = endDate.getSeconds()-startDate.getSeconds();
    if (value!==0) {
        components.seconds = value;
    }

    value = endDate.getMilliseconds()-startDate.getMilliseconds();
    if (value!==0) {
        components.ms = value;
    }

    return components;
}

/**
 * Sleeps for a several amount of time
 * @param components
 */
export function sleep(components: TimeComponents) {
    return new Promise((resolve) => {
        setTimeout(resolve, toMilliseconds(components));
    });
}
