/*
 * @lc app=leetcode id=137 lang=typescript
 *
 * [137] Single Number II
 */

// @lc code=start
function singleNumber(nums: number[]): number {
    const map: Map<number, number> = new Map();

    nums.forEach((num) => {
        map.set(num, (map.get(num) ?? 0) + 1);
    });

    for (const [key, value] of map) {
        if (value === 1) {
            return key;
        }
    }

    return -1;
}
// @lc code=end
