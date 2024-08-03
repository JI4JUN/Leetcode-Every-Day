/*
 * @lc app=leetcode id=136 lang=typescript
 *
 * [136] Single Number
 */

// @lc code=start
function singleNumber(nums: number[]): number {
    let result: number = 0;

    for (const num of nums) {
        result ^= num;
    }

    return result;
}
// @lc code=end
