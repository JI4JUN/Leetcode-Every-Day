/*
 * @lc app=leetcode id=53 lang=typescript
 *
 * [53] Maximum Subarray
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function maxSubArray1(nums: number[]): number {
    let result: number = nums[0];

    for (let i = 0; i < nums.length; ++i) {
        let currentSum: number = 0;

        for (let j = i; j < nums.length; ++j) {
            currentSum += nums[j];

            result = Math.max(result, currentSum);
        }
    }

    return result;
}

// ======================== Approach 2 ======================== //
function maxSubArray(nums: number[]): number {
    let result: number = nums[0];
    let maxEnding: number = nums[0];

    for (let i = 1; i < nums.length; ++i) {
        maxEnding = Math.max(nums[i], maxEnding + nums[i]);
        result = Math.max(result, maxEnding);
    }

    return result;
}
// @lc code=end
