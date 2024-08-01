/*
 * @lc app=leetcode id=121 lang=typescript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
function maxProfit(prices: number[]): number {
    let minPrice: number = Infinity;
    let result: number = 0;

    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else {
            result = Math.max(result, price - minPrice);
        }
    }

    return result;
}
// @lc code=end
