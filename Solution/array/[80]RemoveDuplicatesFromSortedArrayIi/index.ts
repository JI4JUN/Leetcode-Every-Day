/*
 * @lc app=leetcode id=80 lang=typescript
 *
 * [80] Remove Duplicates from Sorted Array II
 */

// @lc code=start
function removeDuplicates(nums: number[]): number {
    const len: number = nums.length;
    if (len <= 2) {
        return len;
    }

    let left: number = 2;
    for (let right = 2; right < len; ++right) {
        if (nums[right] !== nums[left - 2]) {
            nums[left] = nums[right];
            ++left;
        }
    }

    return left;
}
// @lc code=end
