const specialCharacters = new RegExp("([\\[\\]\(\)])", "g");

/**
 * Create a compatible Regexp for a given search string.
 * @param searchQuery String to convert
 * @param flags Optional flags
 * @return RegExp
 */

export function createRegexpFromSearchString(searchQuery:string, flags:string = "ig") {
    return new RegExp("(" + maskRegexpString(searchQuery) + ")", flags);
}

/**
 * Masks a string to a Regexp compatible string
 * @param searchQuery String to convert
 */
export function maskRegexpString(searchQuery: string) {
    return searchQuery.replace(specialCharacters, "\\$1");
}
