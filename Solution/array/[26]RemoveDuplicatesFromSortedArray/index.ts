/*
 * @lc app=leetcode id=26 lang=typescript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
function removeDuplicates(nums: number[]): number {
    const len: number = nums.length;
    if (len === 1) {
        return len;
    }

    let slow: number = 0;
    for (const num of nums) {
        if (num === nums[slow]) {
            continue;
        }

        nums[++slow] = num;
    }

    return slow + 1;
}
// @lc code=end
