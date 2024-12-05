/*
 * @lc app=leetcode id=2404 lang=typescript
 *
 * [2404] Most Frequent Even Element
 */

// @lc code=start
function mostFrequentEven(nums: number[]): number {
	const freqMap = new Map();
	for (const num of nums) {
		if (num % 2 === 0) {
			freqMap.set(num, (freqMap.get(num) ?? 0) + 1);
		}
	}

	let mostFrequentEl = -1;
	let maxFrequence = 0;

	for (const [num, freq] of freqMap) {
		if (freq > maxFrequence) {
			mostFrequentEl = num;
			maxFrequence = freq;
		} else if (freq === maxFrequence && num < mostFrequentEl) {
			mostFrequentEl = num;
		}
	}

	return mostFrequentEl;
}
// @lc code=end
