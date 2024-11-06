/*
 * @lc app=leetcode id=643 lang=typescript
 *
 * [643] Maximum Average Subarray I
 */

// @lc code=start
function findMaxAverage(nums: number[], k: number): number {
	let result: number = -Infinity;
	let left: number = 0;
	let curSum: number = 0;

	for (let i = 0; i < nums.length; i++) {
		curSum += nums[i];

		if (i - left + 1 === k) {
			result = Math.max(result, curSum / k);
			curSum -= nums[left];
			left++;
		}
	}

	return result;
}
// @lc code=end
