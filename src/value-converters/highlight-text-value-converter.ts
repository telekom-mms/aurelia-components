/**
 * Highlights text by given text or precompiled regular expression
 * Usage: <span innerhtml="${property|highlightText:regexpOrString}">&nbsp;</span>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class HighlightTextValueConverter {

    toView(value, text) {
        let regExp;
        if (text instanceof RegExp) {
            regExp = text;
        } else if (text && text.length > 0) {
            regExp = new RegExp("(" + text + ")", "ig");
        } else {
            return value;
        }
        let match = value.match(regExp);
        if (match && match.length) {
            return value.replace(regExp, '<mark>$1</mark>');
        } else {
            return value;
        }
    }
}
