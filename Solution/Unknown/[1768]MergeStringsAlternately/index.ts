/*
 * @lc app=leetcode id=1768 lang=typescript
 *
 * [1768] Merge Strings Alternately
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function mergeAlternately1(word1: string, word2: string): string {
    let result: string = '';
    const word1Len: number = word1.length;
    const word2Len: number = word2.length;

    for (let i = 0; i < Math.max(word1Len, word2Len); i++) {
        if (i < word1Len) {
            result += word1[i];
        }
        if (i < word2Len) {
            result += word2[i];
        }
    }

    return result;
}

// ======================== Approach 2 ======================== //
function mergeAlternately(word1: string, word2: string): string {
    let result: string = '';
    let i: number = 0;

    while (i < Math.min(word1.length, word2.length)) {
        result += word1[i] + word2[i];

        ++i;
    }

    return result + (i < word1.length ? word1.slice(i) : word2.slice(i));
}
// @lc code=end
