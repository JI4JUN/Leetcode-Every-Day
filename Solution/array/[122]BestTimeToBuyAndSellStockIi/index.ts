/*
 * @lc app=leetcode id=122 lang=typescript
 *
 * [122] Best Time to Buy and Sell Stock II
 */

// @lc code=start
function maxProfit(prices: number[]): number {
    let maxProfit: number = 0;

    for (let i = 1; i < prices.length; ++i) {
        maxProfit += Math.max(prices[i] - prices[i - 1], 0);
    }

    return maxProfit;
}
// @lc code=end
