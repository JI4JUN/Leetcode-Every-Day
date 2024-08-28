/*
 * @lc app=leetcode id=274 lang=typescript
 *
 * [274] H-Index
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function hIndex1(citations: number[]): number {
    const len: number = citations.length;

    citations.sort((a, b) => a - b);

    for (let i = 0; i < len; ++i) {
        if (citations[i] >= len - i) {
            return len - i;
        }
    }

    return 0;
}

// ======================== Approach 2 ======================== //
function hIndex(citations: number[]): number {
    const len: number = citations.length;
    const frequency: number[] = citations.reduce(
        (acc, cur) => (cur < len ? (++acc[cur], acc) : (++acc[len], acc)),
        new Array(len + 1).fill(0)
    );

    for (let i = len, count = 0; i >= 0; --i) {
        count += frequency[i];

        if (count >= i) {
            return i;
        }
    }

    return 0;
}
// @lc code=end
