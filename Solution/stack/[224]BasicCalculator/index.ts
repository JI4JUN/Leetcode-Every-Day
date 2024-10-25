/*
 * @lc app=leetcode id=224 lang=typescript
 *
 * [224] Basic Calculator
 */

// @lc code=start
function calculate(s: string): number {
	let result: number = 0;
	let number: number = 0;
	let sign: number = 1;
	const stack: number[] = new Array<number>();

	for (let i = 0; i < s.length; ++i) {
		const c: string = s[i];

		if (c === ' ') {
			continue;
		}

		if (c >= '0' && c <= '9') {
			number = number * 10 + Number(c);
		} else if (c === '+' || c === '-') {
			result += sign * number;
			sign = c === '+' ? 1 : -1;
			number = 0;
		} else if (c === '(') {
			stack.push(result);
			stack.push(sign);
			result = 0;
			sign = 1;
		} else if (c === ')') {
			result += sign * number;
			result *= stack.pop()!;
			result += stack.pop()!;
			number = 0;
		}
	}

	return result + number * sign;
}
// @lc code=end
