/*
 * @lc app=leetcode id=45 lang=typescript
 *
 * [45] Jump Game II
 */

// @lc code=start
function jump(nums: number[]): number {
    const len: number = nums.length;

    if (len === 1) {
        return 0;
    }

    let nextMaxReach: number = 0;
    let curMaxReach: number = 0;
    let jumpCnt: number = 0;

    for (let i = 0; i < len - 1; ++i) {
        nextMaxReach = Math.max(nextMaxReach, i + nums[i]);

        if (curMaxReach === i) {
            ++jumpCnt;

            if (nextMaxReach >= len - 1) {
                break;
            }

            curMaxReach = nextMaxReach;
        }
    }

    return jumpCnt;
}
// @lc code=end
