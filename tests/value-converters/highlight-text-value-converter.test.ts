import 'aurelia-polyfills'
import {Container} from "aurelia-dependency-injection"
import {HTMLSanitizer} from "aurelia-templating-resources";
import {HighlightTextValueConverter} from "../../src/value-converters/highlight-text-value-converter"
import {SanitizeHtmlHtmlSanitizer} from "../../src/value-converters/sanitize-html-html-sanitizer"
import escapeStringRegexp from "escape-string-regexp";

const container = new Container()
container.makeGlobal()

container.registerSingleton(HTMLSanitizer, SanitizeHtmlHtmlSanitizer)
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

let highlightingData2: { inputString2: string; inputRegExp2: RegExp; outputString2: string }[] = [
    {inputString2: "&lt;", inputRegExp2: new RegExp("<"), outputString2: "<mark>&lt;</mark>"},
    {inputString2: "&gt;", inputRegExp2: new RegExp(">"), outputString2: "<mark>&gt;</mark>"},

    // note: this does not work because the htmlSanitizer seems to be converting '&quot;' to '"' although this behavior can not be confirmed when testing it in an application
    // {inputString2: "&quot;", inputRegExp2: new RegExp('"'), outputString2: "<mark>&quot;</mark>"}
];

describe.each(highlightingData2)(``, (data) => {
    it(`string '${data.inputString2}' is in its escaped form surrounded by mark tags although the regExp is unescaped`, () => {
        const highlightedText = highlightTextValueConverter.toView(data.inputString2, data.inputRegExp2)
        expect(highlightedText).toMatch(data.outputString2)
    });
});