/*
 * @lc app=leetcode id=162 lang=typescript
 *
 * [162] Find Peak Element
 */

// @lc code=start
function findPeakElement(nums: number[]): number {
    let left: number = 0;
    let right: number = nums.length - 1;

    while (left < right) {
        const mid: number = left + ((right - left) >> 1);

        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}
// @lc code=end
