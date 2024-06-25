/*
 * @lc app=leetcode.cn id=2798 lang=typescript
 *
 * [2798] Number of Employees Who Met the Target
 */

// @lc code=start
function numberOfEmployeesWhoMetTarget(hours: number[], target: number): number {
    return hours.reduce((count, hour) => hour >= target ? ++count : count, 0);
};
// @lc code=end

