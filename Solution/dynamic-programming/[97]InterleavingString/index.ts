/*
 * @lc app=leetcode id=97 lang=typescript
 *
 * [97] Interleaving String
 */

// @lc code=start
function isInterleave(s1: string, s2: string, s3: string): boolean {
	const s1Length: number = s1.length;
	const s2Length: number = s2.length;

	if (s1Length + s2Length !== s3.length) {
		return false;
	}

	const dp: boolean[][] = Array.from({ length: s1Length + 1 }, () =>
		new Array(s2Length + 1).fill(false)
	);
	dp[0][0] = true;

	for (let i = 1; i <= s1Length; i++) {
		if (s1[i - 1] !== s3[i - 1]) {
			break;
		}

		dp[i][0] = true;
	}

	for (let j = 1; j <= s2Length; j++) {
		if (s2[j - 1] !== s3[j - 1]) {
			break;
		}

		dp[0][j] = true;
	}

	for (let i = 1; i <= s1Length; i++) {
		for (let j = 1; j <= s2Length; j++) {
			const s3Idx: number = i + j - 1;
			dp[i][j] =
				(dp[i - 1][j] && s1[i - 1] === s3[s3Idx]) ||
				(dp[i][j - 1] && s2[j - 1] === s3[s3Idx]);
		}
	}

	return dp[s1Length][s2Length];
}
// @lc code=end
