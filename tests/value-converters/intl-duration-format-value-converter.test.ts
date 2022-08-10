import 'aurelia-polyfills';
import {Container} from "aurelia-dependency-injection";
import {
    IntlDurationFormatValueConverter
} from "../../src/value-converters/intl-duration-format-value-converter";
import {DateTimeComponents, toSeconds} from "../../src/utils/time";

const container = new Container();
container.makeGlobal();

const formatter = container.get(IntlDurationFormatValueConverter);
formatter.setLocale("en");
formatter.setUnits("years-only", ["years"]);
formatter.setUnits("quarters-and-weeks", ["quarter","weeks", "days"]);

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
        expectedFormat: "in 3 days, 4 hours, 5 minutes, 6 seconds"
    },
    {
        input: <DateTimeComponents>{
            days: -1,
            hours: -1,
            minutes: -1,
            seconds: -1
        },
        optionId: null,
        expectedFormat: "1 day, 1 hour, 1 minute, 1 second ago"
    },
    {
        input: <DateTimeComponents>{
            days: 175
        },
        optionId: "quarters-and-weeks",
        expectedFormat: "in 1 quarter, 7 weeks, 6 days"
    },
];

describe.each(formatData)(`durationFormat`, (data) => {
    it(`toView ${toSeconds(data.input)}s, option: ${data.optionId}`, () => {
        const formatted = formatter.toView(data.input, data.optionId);
        expect(formatted).toEqual(data.expectedFormat);
    });
});
