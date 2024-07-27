/*
 * @lc app=leetcode id=561 lang=typescript
 *
 * [561] Array Partition
 */

// @lc code=start
function arrayPairSum1(nums: number[]): number {
    nums.sort((a, b) => a - b);

    let sum: number = 0;

    for (let i = 0; i < nums.length; i += 2) {
        sum += Math.min(nums[i], nums[i + 1]);
    }

    return sum;
}

function arrayPairSum(nums: number[]): number {
    return nums
        .sort((a, b) => a - b)
        .reduce((sum, curr, index) => (index % 2 ? sum : sum + curr), 0);
}
// @lc code=end
