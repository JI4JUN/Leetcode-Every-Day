/*
 * @lc app=leetcode id=33 lang=typescript
 *
 * [33] Search in Rotated Sorted Array
 */

// @lc code=start
function search(nums: number[], target: number): number {
    let left: number = 0;
    let right: number = nums.length - 1;

    while (left <= right) {
        const mid: number = left + ((right - left) >> 1);
        const midValue: number = nums[mid];

        if (midValue === target) {
            return mid;
        } else if (midValue >= nums[left]) {
            if (nums[left] <= target && target < midValue) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (midValue < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}
// @lc code=end
