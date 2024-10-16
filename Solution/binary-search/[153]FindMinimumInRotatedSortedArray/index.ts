/*
 * @lc app=leetcode id=153 lang=typescript
 *
 * [153] Find Minimum in Rotated Sorted Array
 */

// @lc code=start
function findMin(nums: number[]): number {
    let left: number = 0;
    let right: number = nums.length - 1;

    while (left < right) {
        const mid: number = left + ((right - left) >> 1);

        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return nums[left];
}
// @lc code=end
