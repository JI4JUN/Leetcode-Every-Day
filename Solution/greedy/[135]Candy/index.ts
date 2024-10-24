/*
 * @lc app=leetcode id=135 lang=typescript
 *
 * [135] Candy
 */

// @lc code=start
function candy(ratings: number[]): number {
	const ratingsLen: number = ratings.length;
	const candies: number[] = new Array(ratingsLen).fill(1);

	for (let i = 1; i < ratingsLen; ++i) {
		if (ratings[i] > ratings[i - 1]) {
			candies[i] = candies[i - 1] + 1;
		}
	}

	for (let i = ratingsLen - 2; i >= 0; --i) {
		if (ratings[i] > ratings[i + 1]) {
			candies[i] = Math.max(candies[i], candies[i + 1] + 1);
		}
	}

	return candies.reduce((acc, cur) => acc + cur, 0);
}
// @lc code=end
