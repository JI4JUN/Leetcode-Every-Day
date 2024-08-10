/*
 * @lc app=leetcode id=961 lang=typescript
 *
 * [961] N-Repeated Element in Size 2N Array
 */

// @lc code=start
function repeatedNTimes(nums: number[]): number {
    const map: Map<number, number> = new Map();
    const n: number = nums.length >> 1;

    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);

        if (map.get(num) === n) {
            return num;
        }
    }

    return -1;
}
// @lc code=end
