/*
 * @lc app=leetcode id=35 lang=typescript
 *
 * [35] Search Insert Position
 */

// @lc code=start
function searchInsert(nums: number[], target: number): number {
    let left: number = 0;
    let right: number = nums.length;

    while (left < right) {
        const mid: number = left + ((right - left) >> 1);
        const num: number = nums[mid];
        if (num > target) {
            right = mid;
        } else if (num < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }

    return right;
}
// @lc code=end
