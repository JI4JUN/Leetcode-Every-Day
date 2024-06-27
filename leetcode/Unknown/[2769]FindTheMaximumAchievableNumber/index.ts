/*
 * @lc app=leetcode id=2769 lang=typescript
 *
 * [2769] Find the Maximum Achievable Number
 */

// @lc code=start
function theMaximumAchievableX(num: number, t: number): number {
    return num + (t << 1);
}
// @lc code=end
