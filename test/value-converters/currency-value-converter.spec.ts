import {CurrencyValueConverter} from "../../src/value-converters/currency-value-converter";
import {DI} from "aurelia";

const container = DI.createContainer()

const currencyValueConverter = container.get(CurrencyValueConverter);
currencyValueConverter.setLocale("en");

const testData = [
    {
        value: 13,
        precision: 2,
        currency: "eur",
        expected: '€13.00'
    },
    {
        value: 13.1337,
        precision: 2,
        currency: "usd",
        expected: '$13.13'
    },
    {
        value: 13.1337,
        precision: undefined,
        currency: "usd",
        expected: '$13.13'
    },
    {
        value: 0.0037,
        precision: 2,
        currency: "usd",
        expected: '$0.0037'
    },
];

describe.each(testData)(`toView`, (data) => {
    it(`format '${data.value}' as ${data.currency}`, () => {
        const formatted = currencyValueConverter.toView(data.value, data.currency, data.precision);
        expect(formatted).toEqual(data.expected);
    });
});
