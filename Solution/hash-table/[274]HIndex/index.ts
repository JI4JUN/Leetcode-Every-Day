/*
 * @lc app=leetcode id=274 lang=typescript
 *
 * [274] H-Index
 */

// @lc code=start
function hIndex(citations: number[]): number {
    const len: number = citations.length;

    citations.sort((a, b) => a - b);

    for (let i = 0; i < len; ++i) {
        if (citations[i] >= len - i) {
            return len - i;
        }
    }

    return 0;
}
// @lc code=end
