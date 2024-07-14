/*
 * @lc app=leetcode id=27 lang=typescript
 *
 * [27] Remove Element
 */

// @lc code=start
function removeElement(nums: number[], val: number): number {
    let slow: number = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        const num: number = nums[fast];
        if (num !== val) {
            nums[slow++] = num;
        }
    }

    return slow;
}
// @lc code=end
