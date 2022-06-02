import {HTMLSanitizer} from "aurelia-templating-resources";
import {autoinject} from "aurelia-dependency-injection";
import escapeStringRegexp from "escape-string-regexp";

/**
 * Highlights text by given text or precompiled regular expression.
 * Uses HTMLSanitizer interface to sanitize HTML before adding `<mark>` tags.
 * Usage: <span innerhtml="${property|highlightText:regexpOrString}">&nbsp;</span>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
@autoinject()
export class HighlightTextValueConverter {

    constructor(
        private readonly _htmlSanitizer:HTMLSanitizer
    ) {
    }

    toView(value, text) {
        if (!value) {
            return value;
        } else {
            value = this._htmlSanitizer.sanitize(value);
        }

        let regExp;
        if (text instanceof RegExp) {
            regExp = text;
        } else if (text && text.length > 0) {
            regExp = new RegExp("(" + escapeStringRegexp(text) + ")", "ig");
        }

        if (regExp) {
            // value is sanitized, so the RegExp has to be sanitized as well to match the results
            // this fixes the issue with &, <, >, "
            regExp = new RegExp(this._htmlSanitizer.sanitize(regExp.source), regExp.flags);
            const match = value.match(regExp);
            if (match && match.length) {
                value = value.replace(regExp, '<mark>$&</mark>');
            }
        }

        return value;
    }
}
