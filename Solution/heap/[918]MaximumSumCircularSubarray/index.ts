/*
 * @lc app=leetcode id=918 lang=typescript
 *
 * [918] Maximum Sum Circular Subarray
 */

// @lc code=start
function maxSubarraySumCircular(nums: number[]): number {
    const kadane = (nums: number[]): number => {
        let currentSum: number = nums[0];
        let maxSum: number = nums[0];

        for (let i = 1; i < nums.length; ++i) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    };

    const maxNonCircular: number = kadane(nums);
    const totalSum: number = nums.reduce((acc, curr) => acc + curr, 0);
    const invertedNums: number[] = nums.map((num) => -num);
    const maxCircular: number = totalSum + kadane(invertedNums);

    return maxCircular > 0
        ? Math.max(maxNonCircular, maxCircular)
        : maxNonCircular;
}
// @lc code=end
