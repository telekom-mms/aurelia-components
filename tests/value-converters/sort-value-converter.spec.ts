import 'aurelia-polyfills';
import {Container} from "aurelia-dependency-injection";
import {SortValueConverter} from "../../src/value-converters/sort-value-converter";

const container = new Container();
container.makeGlobal();

const sortValueConverter = container.get(SortValueConverter);

const sortData = [
    {
        input: [3, undefined, 7, false, "string", -5, null, {}, true, 1],
        slice: 8,
        expected: [-5, {}, true, 1, 3, 7, false, "string"]
    },
];

describe.each(sortData)(`toView`, (data) => {
    it(`sort '${data.input}'`, () => {
        const formatted = sortValueConverter.toView(data.input);
        expect(formatted.slice(0, data.slice)).toEqual(data.expected);
    });
});
