/*
 * @lc app=leetcode id=392 lang=typescript
 *
 * [392] Is Subsequence
 */

// @lc code=start
function isSubsequence(s: string, t: string): boolean {
    if (s.length > t.length) {
        return false;
    }

    let preIndex: number = -1;

    for (const c of s) {
        const currIndex: number = t.indexOf(c, preIndex + 1);

        if (currIndex === -1) {
            return false;
        }

        preIndex = currIndex;
    }

    return true;
}
// @lc code=end
