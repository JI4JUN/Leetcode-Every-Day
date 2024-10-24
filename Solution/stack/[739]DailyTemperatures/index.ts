/*
 * @lc app=leetcode id=739 lang=typescript
 *
 * [739] Daily Temperatures
 */

// @lc code=start
function dailyTemperatures(temperatures: number[]): number[] {
	const result: number[] = new Array(temperatures.length).fill(0);
	const monotonicStack: number[] = [0];

	for (let i = 0; i < temperatures.length; ++i) {
		while (
			monotonicStack.length > 0 &&
			temperatures[i] > temperatures[monotonicStack.at(-1)!]
		) {
			const preMaxIdx: number = monotonicStack.pop()!;
			result[preMaxIdx] = i - preMaxIdx;
		}

		monotonicStack.push(i);
	}

	return result;
}
// @lc code=end
