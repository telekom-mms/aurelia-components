import {
    IntlDurationFormatValueConverter
} from "../../src/value-converters/intl-duration-format-value-converter";
import {DateTimeComponents, toSeconds} from "../../src/utils/time";
import {DI} from "aurelia";

const container = DI.createContainer()

const formatter = container.get(IntlDurationFormatValueConverter);
formatter.setLocale("en");
formatter.setUnits("years-only", ["years"]);
formatter.setUnits("quarters-and-weeks", ["quarter","weeks", "days"]);

formatter.setUnits("day-only", ["day"]);
formatter.setOptions("day-only", {numeric: "auto"});

formatter.setUnits("days-and-hours", ["day", "hour"]);
formatter.setOptions("days-and-hours", {numeric: "auto"});

formatter.setOptions("short", {style: "short"});
formatter.setSeparators("short", " ");

const formatData = [
    {
        input: <DateTimeComponents>{
            years: -2
        },
        optionId: null,
        expectedFormat: '730 days ago'
    },
    {
        input: <DateTimeComponents>{
            years: -2
        },
        optionId: "years-only",
        expectedFormat: '2 years ago'
    },
    {
        input: <DateTimeComponents>{
            days: 3,
            hours: 4,
            minutes: 5,
            seconds: 6
        },
        optionId: null,
        expectedFormat: "in 3 days, in 4 hours, in 5 minutes, in 6 seconds"
    },
    {
        input: <DateTimeComponents>{
            days: -1,
            hours: -1,
            minutes: -1,
            seconds: -1
        },
        optionId: null,
        expectedFormat: "1 day ago, 1 hour ago, 1 minute ago, 1 second ago"
    },
    {
        input: <DateTimeComponents>{
            days: 188
        },
        optionId: "quarters-and-weeks",
        expectedFormat: "in 2 quarters, in 1 week, in 1 day"
    },
    {
        input: <DateTimeComponents>{
            days: 2,
        },
        optionId: "day-only",
        locale: "es",
        expectedFormat: "pasado mañana"
    },
    {
        input: <DateTimeComponents>{
            hours: -100,
        },
        optionId: "days-and-hours",
        locale: "es",
        expectedFormat: "hace 4 días, hace 4 horas"
    },
    {
        input: <DateTimeComponents>{
            hours: -100,
        },
        optionId: "days-and-hours",
        locale: "en",
        expectedFormat: "4 days ago, 4 hours ago"
    },
    {
        input: <DateTimeComponents>{
            hours: -25,
        },
        optionId: "days-and-hours",
        locale: "en",
        expectedFormat: "yesterday, 1 hour ago"
    },
    {
        input: <DateTimeComponents>{
            seconds: 4100,
        },
        optionId: "short",
        locale: "en",
        expectedFormat: "in 1 hr. in 8 min. in 20 sec."
    },
];

describe.each(formatData)(`durationFormat`, (data) => {
    it(`toView ${toSeconds(data.input)}s, option: ${data.optionId}, locale: ${data.locale}`, () => {
        if (data.locale) {
            formatter.setLocale(data.locale);
        }

        const formatted = formatter.toView(data.input, data.optionId);
        expect(formatted).toEqual(data.expectedFormat);
    });
});
