import 'aurelia-polyfills';
import {Container} from "aurelia-dependency-injection";
import {SortValueConverter} from "../../src/value-converters/sort-value-converter";

const container = new Container();
container.makeGlobal();

const sortValueConverter = container.get(SortValueConverter);

const sortData = [
    {
        input: ["false", 3, undefined, "0", 7, "true", false, "string", -5, null, {}, true, 1, "tall", "ferengi"],
        testSlice: 13,
        expected: [-5, {}, "0", 1, 3, 7, "false", false, "ferengi", "string", "tall", "true", true]
    },
];

describe.each(sortData)(`toView`, (data) => {
    it(`sort '${data.input}'`, () => {
        const formatted = sortValueConverter.toView(data.input);
        expect(formatted.slice(0, data.testSlice)).toEqual(data.expected);
    });
});
