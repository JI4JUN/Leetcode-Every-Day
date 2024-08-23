/*
 * @lc app=leetcode id=88 lang=typescript
 *
 * [88] Merge Sorted Array
 */

// @lc code=start
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let pos: number = m-- + n-- - 1;

    while (m >= 0 && n >= 0) {
        const n1: number = nums1[m];
        const n2: number = nums2[n];

        nums1[pos--] = n1 > n2 ? (--m, n1) : (--n, n2);
    }

    while (n >= 0) {
        nums1[pos--] = nums2[n--];
    }
}
// @lc code=end
