import sanitize from 'sanitize-html'
import {HTMLSanitizer} from "./html-sanitizer";

// adding index signature, but allowing explicit any because there are so many options
type IOptions = sanitize.IOptions & {[key: string]: any}

/**
 *  Sanitizes HTML tags for use in `innerhtml` attribute.
 *  <p>You have to configure Aurelia DI to use an implementation on configuration stage.</p>
 *  <p>Usage: <code><span innerhtml.bind="insecureValue|sanitizeHTML"></span></code></p>
 * @author Simon Beyer <Simon.Beyer@t-systems.com>
 */
export class SanitizeHtmlHtmlSanitizer implements HTMLSanitizer {
    private _options: IOptions = { ...sanitize.defaults }

    /**
     * A sensible default apart from {@link sanitize}s own: Escape everything, auto-correct nothing.
     * <p>Use as base to add exceptions to as desired, before passing into {@link withOptions}.</p>
     */
    static get paranoidOptions(): IOptions {
        const options: IOptions = { ...sanitize.defaults }

        for (const field in options) {
            if (field.startsWith("allowed")) {
                options[field] = options[field] instanceof Array ? [] : {}
            }
        }
        // no discard
        options.disallowedTagsMode = "recursiveEscape"
        options.nonTextTags = []
        // no add
        options.selfClosing = []

        return options
    }

    /**
     * Replaces any default or previously set options.
     * <p>You may want to use {@link sanitize.defaults} or {@link paranoidOptions} to obtain a base object to modify,
     *    instead of starting empty. (Empty means "everything allowed" in
     *    <a href="https://www.npmjs.com/package/sanitize-html?activeTab=readme">sanitize-html</a>.)</p>
     */
    withOptions(options: IOptions): SanitizeHtmlHtmlSanitizer {
        this._options = options
        return this
    }

    sanitize(input:string) {
        return sanitize(input, this._options)
    }
}
