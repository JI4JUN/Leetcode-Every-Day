/*
 * @lc app=leetcode id=1346 lang=typescript
 *
 * [1346] Check If N and Its Double Exist
 */

// @lc code=start
function checkIfExist(arr: number[]): boolean {
	const set = new Set();

	for (const num of arr) {
		if (set.has(2 * num)) return true;
		if (num % 2 === 0 && set.has(num >> 1)) return true;

		set.add(num);
	}

	return false;
}
// @lc code=end
