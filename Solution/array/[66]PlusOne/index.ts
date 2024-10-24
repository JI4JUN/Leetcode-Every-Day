/*
 * @lc app=leetcode id=66 lang=typescript
 *
 * [66] Plus One
 */

// @lc code=start
function plusOne(digits: number[]): number[] {
	for (let i = digits.length - 1; i >= 0; --i) {
		if (digits[i] + 1 === 10) {
			digits[i] = 0;

			if (i === 0) {
				digits.unshift(1);

				break;
			}
		} else {
			digits[i] += 1;

			break;
		}
	}

	return digits;
}
// @lc code=end
