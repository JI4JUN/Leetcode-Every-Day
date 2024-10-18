/*
 * @lc app=leetcode id=509 lang=typescript
 *
 * [509] Fibonacci Number
 */

// @lc code=start
function fib(n: number): number {
    if (n <= 1) {
        return n;
    }

    const dp: number[] = new Array(n + 1);

    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
// @lc code=end
