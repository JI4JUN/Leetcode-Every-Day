/*
 * @lc app=leetcode id=274 lang=typescript
 *
 * [274] H-Index
 */

// @lc code=start
function hIndex(citations: number[]): number {
    const len: number = citations.length;

    return citations
        .sort((a, b) => a - b)
        .reduce(
            (acc, cur, i) => (cur > len - i ? Math.max(acc, len - i) : cur),
            0
        );
}
// @lc code=end
