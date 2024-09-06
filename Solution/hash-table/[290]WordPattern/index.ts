/*
 * @lc app=leetcode id=290 lang=typescript
 *
 * [290] Word Pattern
 */

// @lc code=start
function wordPattern(pattern: string, s: string): boolean {
    const words: string[] = s.split(' ');
    const wordsLen: number = words.length;

    if (wordsLen !== pattern.length) {
        return false;
    }

    const patternList: number[] = new Array(128).fill(0);
    const map: Map<string, string> = new Map();

    for (let i = 0; i < wordsLen; ++i) {
        const word: string = words[i];
        const patternChar: string = pattern[i];

        if (map.has(word)) {
            if (map.get(word) !== patternChar) {
                return false;
            }
        } else {
            const patternIndex: number = patternChar.charCodeAt(0);

            if (patternList[patternIndex] > 0) {
                return false;
            }

            map.set(word, patternChar);
            ++patternList[patternIndex];
        }
    }

    return true;
}
// @lc code=end
