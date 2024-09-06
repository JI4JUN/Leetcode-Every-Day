/*
 * @lc app=leetcode id=219 lang=typescript
 *
 * [219] Contains Duplicate II
 */

// @lc code=start
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map: Map<number, number> = new Map();

    for (let i = nums.length - 1; i >= 0; --i) {
        const num: number = nums[i];

        if (map.has(num)) {
            if (map.get(num)! - i <= k) {
                return true;
            }
        }

        map.set(num, i);
    }

    return false;
}
// @lc code=end
