export declare class GraphemeSplitter {
    prevBreak(string: string, index: number): number;
    /**
     * Returns the next grapheme break in the string after the given index
     * @param string {string}
     * @param index {number}
     * @returns {number}
     */
    nextBreak(string: string, index: number): number;
    /**
     * Breaks the given string into an array of grapheme cluster strings
     * @param str {string}
     * @returns {string[]}
     */
    splitGraphemes(str: string): string[];
    /**
     * Returns the iterator of grapheme clusters there are in the given string
     * @param str {string}
     * @returns {Iterator<string|undefined>}
     */
    /**
     * Returns the number of grapheme clusters there are in the given string
     * @param str {string}
     * @returns {number}
     */
    countGraphemes(str: string): number;
    /**
     * Given a Unicode code point, determines this symbol's grapheme break property
     * @param code {number} Unicode code point
     * @returns {number}
     */
    static getGraphemeBreakProperty(code: number): 1 | 8 | 0 | 2 | 3 | 7 | 9 | 11 | 12 | 4 | 5 | 6 | 10 | 15;
    static getEmojiProperty(code: number): 11 | 101;
}
