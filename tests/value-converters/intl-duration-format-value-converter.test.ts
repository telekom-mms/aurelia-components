import 'aurelia-polyfills';
import {Container} from "aurelia-dependency-injection";
import {IntlDateFormatValueConverter} from "../../src/value-converters/intl-date-format-value-converter";
import {
    IntlDurationFormatValueConverter
} from "../../src/value-converters/intl-duration-format-value-converter";
import {DateTimeComponents} from "../../src/utils/time";

const container = new Container();
container.makeGlobal();

const formatter = container.get(IntlDurationFormatValueConverter);
formatter.setLocale("en");
formatter.setOptions("full", { dateStyle: 'full', timeStyle: 'long' });
formatter.setOptions("default", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const formatData = [
    // {
    //     input: <DateTimeComponents>{
    //         years: 2
    //     },
    //     optionId: null,
    //     expectedFormat: '2 years'
    // },
    {
        input: <DateTimeComponents>{
            years: -2
        },
        optionId: null,
        expectedFormat: '2 years'
    },
];

describe.each(formatData)(`toView`, (data) => {
    it(`durationFormat '${data.input}, option: ${data.optionId}'`, () => {
        const formatted = formatter.toView(data.input, data.optionId);
        expect(formatted).toEqual(data.expectedFormat);
    });
});
