/*
 * @lc app=leetcode id=169 lang=typescript
 *
 * [169] Majority Element
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function majorityElement1(nums: number[]): number {
    const map: Map<number, number> = new Map();

    for (const n of nums) {
        map.set(n, (map.get(n) || 0) + 1);
    }

    for (const [k, v] of map) {
        if (v > nums.length >> 1) {
            return k;
        }
    }

    return -1;
}

// ======================== Approach 2 ======================== //
function majorityElement2(nums: number[]): number {
    return nums.sort((a, b) => a - b)[nums.length >> 1];
}

// ======================== Approach 3 ======================== //
function majorityElement(nums: number[]): number {
    let candidate: number = -1;
    let count: number = 0;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }

        num === candidate ? ++count : --count;
    }

    return candidate;
}
// @lc code=end
