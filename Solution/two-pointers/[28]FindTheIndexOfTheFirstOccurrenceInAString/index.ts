/*
 * @lc app=leetcode id=28 lang=typescript
 *
 * [28] Find the Index of the First Occurrence in a String
 */

// @lc code=start
// ======================== Approach 1 ======================== //
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

// ======================== Approach 2 ======================== //
function strStr2(haystack: string, needle: string): number {
    return haystack.indexOf(needle);
}

// ======================== Approach 3 ======================== //
function strStr(haystack: string, needle: string): number {
    const createNext = (str: string): number[] => {
        const strLen: number = str.length;
        let next: number[] = new Array(strLen).fill(-1);
        let j: number = -1;

        for (let i = 1; i < strLen; ++i) {
            while (j >= 0 && str[i] !== str[j + 1]) {
                j = next[j];
            }

            if (str[i] === str[j + 1]) {
                ++j;
            }

            next[i] = j;
        }

        return next;
    };

    const next: number[] = createNext(needle);
    const needleLen: number = needle.length;
    let j: number = -1;

    for (let i = 0; i < haystack.length; ++i) {
        while (j >= 0 && haystack[i] !== needle[j + 1]) {
            j = next[j];
        }

        if (haystack[i] === needle[j + 1]) {
            ++j;
        }

        if (j === needleLen - 1) {
            return i - needleLen + 1;
        }
    }

    return -1;
}
// @lc code=end
