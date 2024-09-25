/*
 * @lc app=leetcode id=190 lang=typescript
 *
 * [190] Reverse Bits
 */

// @lc code=start
function reverseBits(n: number): number {
    let result = 0;

    for (let i = 0; i < 32; i++) {
        result <<= 1;
        result = result | (n & 1);
        n >>>= 1;
    }

    return result >>> 0;
}
// @lc code=end
