/*
 * @lc app=leetcode id=55 lang=typescript
 *
 * [55] Jump Game
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function canJump(nums: number[]): boolean {
    const len: number = nums.length;

    if (len === 1) {
        return true;
    }

    let maxReach: number = 0;

    for (let i = 0; i < len - 1; ++i) {
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

// ======================== Approach 2 ======================== //
function canJump2(nums: number[]): boolean {
    let gas: number = 0;

    for (const num of nums) {
        if (gas < 0) {
            return false;
        } else if (num > gas) {
            gas = num;
        }

        --gas;
    }

    return true;
}
// @lc code=end
