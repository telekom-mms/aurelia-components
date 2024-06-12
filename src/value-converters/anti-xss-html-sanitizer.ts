import {HTMLSanitizer} from "./html-sanitizer";

/**
 * Sanitizes HTML tags for use in `innerhtml` attribute.
 * You have to configure Aurelia DI to use this implementation on configuration stage.
 * Usage: <span innerhtml.bind="insecureValue|sanitizeHTML"></span>
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @deprecated Use {@link SanitizeHtmlHtmlSanitizer} instead
 */
export class AntiXssHtmlSanitizer extends HTMLSanitizer {

    private _regex:RegExp;

    constructor() {
        super()
        this.setUntrustedTags(["img","script"]);
    }

    setUntrustedTags(tags:string[]) {
        this._regex = new RegExp(`<(${tags.map(value => value.trim()).join("|")})([^>]*)>`, "ig");
    }

    sanitize(input:string) {
        return input.replace(this._regex, '&lt;$1$2&gt;');
    }
}
