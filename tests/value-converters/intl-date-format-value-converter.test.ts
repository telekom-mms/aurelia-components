import 'aurelia-polyfills';
import {Container} from "aurelia-dependency-injection";
import {IntlDateFormatValueConverter} from "../../src/value-converters/intl-date-format-value-converter";

const container = new Container();
container.makeGlobal();

const dateFormatter = container.get(IntlDateFormatValueConverter);
dateFormatter.setLocale("en");
dateFormatter.setOptions("full", { dateStyle: 'full', timeStyle: 'long' });
dateFormatter.setOptions("default", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const inputDate = new Date(0);
const inputTimestamp = 0;
const inputString = "1970-1-1 13:37:00"

const formatData = [
    {
        input: inputDate,
        optionId: null,
        expectedFormat: '1/1/1970'
    },
    {
        input: inputDate,
        optionId: undefined,
        expectedFormat: 'Thursday, January 1, 1970'
    },
    {
        input: inputDate,
        optionId: "default",
        expectedFormat: 'Thursday, January 1, 1970'
    },
    {
        input: inputDate,
        optionId: "full",
        expectedFormat: 'Thursday, January 1, 1970 at 1:00:00 AM GMT+1'
    },
    {
        input: inputTimestamp,
        optionId: "full",
        expectedFormat: 'Thursday, January 1, 1970 at 1:00:00 AM GMT+1'
    },
    {
        input: inputString,
        optionId: "full",
        expectedFormat: 'Thursday, January 1, 1970 at 1:37:00 PM GMT+1'
    }
];

describe.each(formatData)(`toView`, (data) => {
    it(`dateFormats '${data.input}, option: ${data.optionId}'`, () => {
        const formatted = dateFormatter.toView(data.input, data.optionId);
        expect(formatted).toEqual(data.expectedFormat);
    });
});
