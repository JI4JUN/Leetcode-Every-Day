/*
 * @lc app=leetcode id=283 lang=typescript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    const len: number = nums.length;
    let p1: number = 0;

    for (let p2 = 0; p2 < len; p2++) {
        if (nums[p2] !== 0) {
            [nums[p2], nums[p1]] = [nums[p1], nums[p2]];

            ++p1;
        }
    }
}
// @lc code=end
