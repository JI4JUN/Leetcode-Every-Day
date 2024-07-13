/*
 * @lc app=leetcode id=34 lang=typescript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

// @lc code=start
function searchRange(nums: number[], target: number): number[] {
    const len: number = nums.length;
    let left: number = 0;
    let right: number = len;

    while (left < right) {
        const mid: number = left + ((right - left) >> 1);
        const num: number = nums[mid];
        if (num > target) {
            right = mid;
        } else if (num < target) {
            left = mid + 1;
        } else {
            left = right = mid;

            while (left > 0 && nums[left - 1] === target) {
                --left;
            }
            while (right < len && nums[right + 1] === target) {
                ++right;
            }

            return [left, right];
        }
    }

    return [-1, -1];
}
// @lc code=end
