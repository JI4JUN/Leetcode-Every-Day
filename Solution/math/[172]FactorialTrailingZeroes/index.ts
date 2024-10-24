/*
 * @lc app=leetcode id=172 lang=typescript
 *
 * [172] Factorial Trailing Zeroes
 */

// @lc code=start
function trailingZeroes(n: number): number {
	let count: number = 0;

	while (n > 0) {
		n = Math.floor(n / 5);
		count += n;
	}

	return count;
}
// @lc code=end
