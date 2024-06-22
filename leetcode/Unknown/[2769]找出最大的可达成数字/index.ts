/*
 * @lc app=leetcode.cn id=2769 lang=typescript
 *
 * [2769] 找出最大的可达成数字
 */

// @lc code=start
function theMaximumAchievableX(num: number, t: number): number {
    return num + (t << 1);
};
// @lc code=end

