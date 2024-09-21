/*
 * @lc app=leetcode id=1480 lang=typescript
 *
 * [1480] Running Sum of 1d Array
 */

// @lc code=start
function runningSum(nums: number[]): number[] {
    return nums.reduce((acc, curr, index) => {
        acc[index] = acc[index - 1] ? acc[index - 1] + curr : curr;

        return acc;
    }, new Array(nums.length));
}
// @lc code=end
