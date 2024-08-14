/*
 * @lc app=leetcode id=349 lang=typescript
 *
 * [349] Intersection of Two Arrays
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function intersection1(nums1: number[], nums2: number[]): number[] {
    const set: Set<number> = new Set(nums1);
    const result: number[] = [];

    for (const n of nums2) {
        if (set.has(n)) {
            result.push(n);
            set.delete(n);
        }
    }

    return result;
}

// ======================== Approach 2 ======================== //
function intersection(nums1: number[], nums2: number[]): number[] {
    return [...new Set(nums1.filter((n) => nums2.includes(n)))];
}
// @lc code=end
