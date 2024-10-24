/*
 * @lc app=leetcode id=50 lang=typescript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
function myPow(x: number, n: number): number {
	const calc = (x: number, n: number): number => {
		if (x === 0) {
			return 0;
		}
		if (n === 0) {
			return 1;
		}

		let result: number = calc(x, Math.floor(n / 2));
		result *= result;

		if (n % 2 === 1) {
			result *= x;
		}

		return result;
	};

	const ans: number = calc(x, Math.abs(n));

	return n < 0 ? 1 / ans : ans;
}
// @lc code=end
