import 'aurelia-polyfills';
import {Container} from "aurelia-dependency-injection";
import {ByteFormatValueConverter} from "../../src/value-converters/byte-format-value-converter";

const container = new Container();
container.makeGlobal();

const bytesFormatValueConverter = container.get(ByteFormatValueConverter);
bytesFormatValueConverter.setLocale("en");

const bytesData = [
    {
        input: 0,
        expectedLabel: '0 Bytes'
    },
    {
        input: 1,
        expectedLabel: '1 Bytes'
    },
    {
        input: 1023,
        expectedLabel: '1,023 Bytes'
    },
    {
        input: 1024,
        expectedLabel: '1 KiB'
    },
    {
        input: 1025,
        expectedLabel: '1 KiB'
    },
    {
        input: Math.pow(1024,2),
        expectedLabel: '1 MiB'
    },
    {
        input: Math.pow(1024,3),
        expectedLabel: '1 GiB'
    },
];

describe.each(bytesData)(`toView`, (data) => {
    it(`bytes '${data.input}'`, () => {
        const formatted = bytesFormatValueConverter.toView(data.input, 0);
        expect(formatted).toEqual(data.expectedLabel);
    });
});
