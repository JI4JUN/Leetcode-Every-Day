/*
 * @lc app=leetcode id=28 lang=typescript
 *
 * [28] Find the Index of the First Occurrence in a String
 */

// @lc code=start
function strStr1(haystack: string, needle: string): number {
    const needleLen: number = needle.length;

    for (let i = 0, needleIdx = 0; i < haystack.length; ++i) {
        if (haystack[i] === needle[needleIdx]) {
            ++needleIdx;
        } else {
            i -= needleIdx;
            needleIdx = 0;
        }

        if (needleIdx === needleLen) {
            return i - needleIdx + 1;
        }
    }

    return -1;
}

function strStr(haystack: string, needle: string): number {
    return haystack.indexOf(needle);
}
// @lc code=end
