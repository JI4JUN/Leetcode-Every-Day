/*
 * @lc app=leetcode id=72 lang=typescript
 *
 * [72] Edit Distance
 */

// @lc code=start
function minDistance(word1: string, word2: string): number {
	const dp: number[][] = Array.from({ length: word1.length + 1 }, () =>
		new Array(word2.length + 1).fill(-1)
	);
	const recursive = (
		w1: string,
		w2: string,
		i: number,
		j: number
	): number => {
		if (dp[i][j] !== -1) {
			return dp[i][j];
		}
		if (w1.length === 0) {
			return w2.length;
		}
		if (w2.length === 0) {
			return w1.length;
		}

		const insert: number = recursive(w1, w2.slice(1), i, j + 1) + 1;
		const remove: number = recursive(w1.slice(1), w2, i + 1, j) + 1;
		const replace: number =
			recursive(w1.slice(1), w2.slice(1), i + 1, j + 1) +
			(w1[0] === w2[0] ? 0 : 1);
		const curMin: number = Math.min(insert, remove, replace);

		dp[i][j] = curMin;

		return curMin;
	};

	return recursive(word1, word2, 0, 0);
}
// @lc code=end
