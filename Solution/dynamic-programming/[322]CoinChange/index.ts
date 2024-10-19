/*
 * @lc app=leetcode id=322 lang=typescript
 *
 * [322] Coin Change
 */

// @lc code=start
function coinChange(coins: number[], amount: number): number {
    const dp: number[] = new Array(amount + 1).fill(amount + 1);

    dp[0] = 0;

    for (let i = 1; i <= amount; ++i) {
        for (let j = 0; j < coins.length; ++j) {
            if (coins[j] <= i) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }

    return dp[amount] === amount + 1 ? -1 : dp[amount];
}
// @lc code=end
