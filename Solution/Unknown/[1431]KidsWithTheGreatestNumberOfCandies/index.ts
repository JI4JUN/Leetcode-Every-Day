/*
 * @lc app=leetcode id=1431 lang=typescript
 *
 * [1431] Kids With the Greatest Number of Candies
 */

// @lc code=start
function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    const maxCandies: number = Math.max(...candies);

    return candies.map((candy) => candy + extraCandies >= maxCandies);
}
// @lc code=end
