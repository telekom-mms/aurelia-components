import 'aurelia-polyfills';
import {Container} from "aurelia-dependency-injection";
import {PercentValueConverter} from "../../src/value-converters/percent-value-converter";

const container = new Container();
container.makeGlobal();

const percentValueConverter = container.get(PercentValueConverter);
percentValueConverter.setLocale("en");

const testData = [
    {
        input: 0.1,
        expected: '10%'
    },
    {
        input: -1,
        expected: '-100%'
    },
    {
        input: 0,
        expected: '0%'
    },
    {
        input: 0.111,
        expected: '11.1%'
    },
    {
        input: 0.1112,
        expected: '11.12%'
    },
];

describe.each(testData)(`toView`, (data) => {
    it(`value '${data.input}'`, () => {
        const formatted = percentValueConverter.toView(data.input);
        expect(formatted).toEqual(data.expected);
    });
});
