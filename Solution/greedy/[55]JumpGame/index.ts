/*
 * @lc app=leetcode id=55 lang=typescript
 *
 * [55] Jump Game
 */

// @lc code=start
function canJump(nums: number[]): boolean {
    const len: number = nums.length;

    if (len === 1) {
        return true;
    }

    let maxReach: number = 0;

    for (let i = 0; i < len; ++i) {
        if (i > maxReach) {
            return false;
        }

        maxReach = Math.max(maxReach, i + nums[i]);

        if (maxReach >= len - 1) {
            return true;
        }
    }

    return false;
}
// @lc code=end
