/*
 * @lc app=leetcode id=120 lang=typescript
 *
 * [120] Triangle
 */

// @lc code=start
function minimumTotal(triangle: number[][]): number {
	const dp: number[][] = Array.from(
		{ length: triangle.length },
		(_val, idx) => new Array(idx + 1)
	);

	triangle.at(-1)!.forEach((val, idx) => (dp.at(-1)![idx] = val));

	for (let i = triangle.length - 2; i >= 0; --i) {
		for (let j = i; j >= 0; --j) {
			dp[i][j] =
				Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
		}
	}

	return dp[0][0];
}
// @lc code=end
