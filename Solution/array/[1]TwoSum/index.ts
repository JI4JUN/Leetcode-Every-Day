/*
 * @lc app=leetcode id=1 lang=typescript
 *
 * [1] Two Sum
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
    const map: Map<number, number> = new Map<number, number>();

    for (let i = nums.length - 1; i >= 0; --i) {
        const num: number = nums[i];
        const diff: number = target - num;

        if (map.has(diff)) {
            return [map.get(diff)!, i];
        }

        map.set(num, i);
    }

    return [];
}
// @lc code=end
