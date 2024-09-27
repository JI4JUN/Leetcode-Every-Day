/*
 * @lc app=leetcode id=191 lang=typescript
 *
 * [191] Number of 1 Bits
 */

// @lc code=start
function hammingWeight(n: number): number {
    let result: number = 0;

    for (let i = 0; i < 32; ++i) {
        if ((n >> i) & 1) {
            result += 1;
        }
    }
    return result;
}
// @lc code=end
