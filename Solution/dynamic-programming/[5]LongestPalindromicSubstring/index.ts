/*
 * @lc app=leetcode id=5 lang=typescript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
function longestPalindrome(s: string): string {
	const sLength: number = s.length;
	const dp: boolean[][] = Array.from({ length: sLength }, () =>
		new Array(sLength).fill(false)
	);

	for (let i = 0; i < sLength; ++i) {
		dp[i][i] = true;
	}

	let maxLength: number = 1;
	let start: number = 0;

	for (let i = 1; i < sLength; ++i) {
		if (s[i - 1] === s[i]) {
			dp[i - 1][i] = true;
			maxLength = 2;
			start = i - 1;
		}
	}

	for (let length = 3; length <= sLength; ++length) {
		for (let i = 0; i <= sLength - length; ++i) {
			const j: number = i + length - 1;

			if (s[i] === s[j] && dp[i + 1][j - 1]) {
				dp[i][j] = true;

				if (length > maxLength) {
					maxLength = length;
					start = i;
				}
			}
		}
	}

	return s.substring(start, start + maxLength);
}
// @lc code=end
