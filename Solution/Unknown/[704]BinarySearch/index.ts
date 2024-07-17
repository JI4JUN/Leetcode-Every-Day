/*
 * @lc app=leetcode id=704 lang=typescript
 *
 * [704] Binary Search
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function search1(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid: number = left + ((right - left) >> 1);
        const curr: number = nums[mid];

        if (curr < target) {
            left = mid + 1;
        } else if (curr > target) {
            right = mid - 1;
        } else {
            return mid;
        }
    }

    return -1;
}

// ======================== Approach 2 ======================== //
function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length;
    while (left < right) {
        const mid: number = left + ((right - left) >> 1);
        const curr: number = nums[mid];

        if (curr < target) {
            left = mid + 1;
        } else if (curr > target) {
            right = mid;
        } else {
            return mid;
        }
    }

    return -1;
}
// @lc code=end
