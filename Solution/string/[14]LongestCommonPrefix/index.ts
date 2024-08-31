/*
 * @lc app=leetcode id=14 lang=typescript
 *
 * [14] Longest Common Prefix
 */

// @lc code=start
function longestCommonPrefix(strs: string[]): string {
    let result: string = '';
    strs.sort();

    for (
        let startStr = strs.at(0)!, endStr = strs.at(-1)!, i = 0;
        i < Math.min(startStr.length, endStr.length);
        ++i
    ) {
        const startChar: string = startStr.at(i)!;
        if (startChar !== endStr[i]) {
            return result;
        }

        result += startChar;
    }

    return result;
}
// @lc code=end
