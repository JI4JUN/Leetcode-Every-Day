/*
 * @lc app=leetcode id=209 lang=typescript
 *
 * [209] Minimum Size Subarray Sum
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
    const len: number = nums.length;

    let result: number = Infinity;
    let left: number = 0;
    let right: number = 0;
    let sum: number = 0;

    while (right < len) {
        const count: number = right - left + 1;

        sum += nums[right];

        if (sum >= target) {
            result = Math.min(result, count);
            right = ++left;
            sum = 0;
        } else {
            if (count === len) {
                break;
            }

            ++right;
        }
    }

    return result === Infinity ? 0 : result;
}
// @lc code=end
