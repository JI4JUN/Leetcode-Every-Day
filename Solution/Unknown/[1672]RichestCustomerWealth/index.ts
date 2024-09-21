/*
 * @lc app=leetcode id=1672 lang=typescript
 *
 * [1672] Richest Customer Wealth
 */

// @lc code=start
function maximumWealth(accounts: number[][]): number {
    return accounts.reduce((acc, curr) => {
        const currWealth: number = curr.reduce((acc, curr) => acc + curr, 0);

        return Math.max(acc, currWealth);
    }, 0);
}
// @lc code=end
