/*
 * @lc app=leetcode id=63 lang=typescript
 *
 * [63] Unique Paths II
 */

// @lc code=start
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
	const m: number = obstacleGrid.length;
	const n: number = obstacleGrid[0].length;
	const dp: number[][] = Array.from({ length: m }, () =>
		new Array(n).fill(0)
	);

	for (let i = 0; i < m; ++i) {
		if (obstacleGrid[i][0] === 1) {
			break;
		}

		dp[i][0] = 1;
	}
	for (let i = 0; i < n; ++i) {
		if (obstacleGrid[0][i] === 1) {
			break;
		}

		dp[0][i] = 1;
	}

	for (let i = 1; i < m; ++i) {
		for (let j = 1; j < n; ++j) {
			dp[i][j] =
				obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];
		}
	}

	return dp[m - 1][n - 1];
}
// @lc code=end
