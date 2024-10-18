/*
 * @lc app=leetcode id=746 lang=typescript
 *
 * [746] Min Cost Climbing Stairs
 */

// @lc code=start
function minCostClimbingStairs(cost: number[]): number {
    const n: number = cost.length;

    if (n === 2) {
        return Math.min(cost[0], cost[1]);
    }

    const dp: number[] = new Array(n);

    dp[0] = cost[0];
    dp[1] = cost[1];

    for (let i = 2; i < n; ++i) {
        dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
    }

    return Math.min(dp[n - 1], dp[n - 2]);
}
// @lc code=end
