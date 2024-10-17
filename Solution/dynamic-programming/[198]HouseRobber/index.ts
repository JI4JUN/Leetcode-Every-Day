/*
 * @lc app=leetcode id=198 lang=typescript
 *
 * [198] House Robber
 */

// @lc code=start
function rob(nums: number[]): number {
    const len: number = nums.length;

    if (len === 1) {
        return nums[0];
    }

    const dp: number[] = new Array(len).fill(0);

    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < len; ++i) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[len - 1];
}
// @lc code=end
