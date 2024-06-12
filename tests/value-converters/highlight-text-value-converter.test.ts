import {HighlightTextValueConverter} from "../../src/value-converters/highlight-text-value-converter"
import {SanitizeHtmlHtmlSanitizer} from "../../src/value-converters/sanitize-html-html-sanitizer"
import {HTMLSanitizer} from "../../src/value-converters/html-sanitizer"
import escapeStringRegexp from "escape-string-regexp";
import {DI, Registration} from "aurelia";

const container = DI.createContainer()
container.register(
    Registration.singleton(HTMLSanitizer, SanitizeHtmlHtmlSanitizer)
)

const htmlSanitizer = container.get(HTMLSanitizer) as SanitizeHtmlHtmlSanitizer
const highlightTextValueConverter = container.get(HighlightTextValueConverter)

let highlightingData: { inputString: string; inputRegExp: RegExp; outputString: string }[] = [
    {inputString: null, inputRegExp: null, outputString: null}
];

for (let i = 0; i < 256; i++) {
    let testString = String.fromCharCode(i)
    highlightingData[i] = {
        inputString: testString,
        inputRegExp: new RegExp("(" + escapeStringRegexp(testString) + ")", "g"),
        outputString: `<mark>${htmlSanitizer.sanitize(testString)}</mark>`
    }
}

describe.each(highlightingData)(`toView with string`, (data) => {
    it(`string '${data.inputString}' is surrounded by mark tags`, () => {
        console.log(data.inputString)
        const highlightedText = highlightTextValueConverter.toView(data.inputString, data.inputString)
        console.log(highlightedText)
        console.log(highlightedText === data.outputString)
        expect(highlightedText).toMatch(data.outputString)
    });
});

describe.each(highlightingData)(`toView with precompiled RegExp`, (data) => {
    it(`regExp '${data.inputString}' result is surrounded by mark tags`, () => {
        console.log(data.inputString)
        const highlightedText = highlightTextValueConverter.toView(data.inputString, data.inputRegExp)
        console.log(highlightedText)
        console.log(highlightedText === data.outputString)
        expect(highlightedText).toMatch(data.outputString)
    });
});
