/*
 * @lc app=leetcode id=771 lang=typescript
 *
 * [771] Jewels and Stones
 */

// @lc code=start
function numJewelsInStones(jewels: string, stones: string): number {
    let count: number = 0;

    for (const stone of stones) {
        if (jewels.includes(stone)) {
            ++count;
        }
    }

    return count;
}
// @lc code=end
