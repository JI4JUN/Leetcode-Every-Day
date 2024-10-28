/*
 * @lc app=leetcode id=221 lang=typescript
 *
 * [221] Maximal Square
 */

// @lc code=start
function maximalSquare(matrix: string[][]): number {
	const m: number = matrix.length;
	const n: number = matrix[0].length;
	const dp: number[][] = Array.from({ length: m }, () =>
		new Array(n).fill(-1)
	);
	const recursive = (row: number, col: number): number => {
		if (row === m || col === n) {
			return 0;
		}
		if (dp[row][col] !== -1) {
			return dp[row][col];
		}

		dp[row][col] = 0;

		const right: number = recursive(row, col + 1);
		const down: number = recursive(row + 1, col);
		const diagonal: number = recursive(row + 1, col + 1);

		if (matrix[row][col] === '1') {
			dp[row][col] = Math.min(right, down, diagonal) + 1;
		}

		return dp[row][col];
	};

	recursive(0, 0);

	let max: number = 0;

	for (let i = 0; i < m; ++i) {
		for (let j = 0; j < n; ++j) {
			max = Math.max(max, dp[i][j]);
		}
	}

	return max ** 2;
}
// @lc code=end
