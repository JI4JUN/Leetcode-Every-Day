/*
 * @lc app=leetcode id=344 lang=typescript
 *
 * [344] Reverse String
 */

// @lc code=start
/**
 Do not return anything, modify s in-place instead.
 */
function reverseString1(s: string[]): void {
    let left: number = 0,
        right: number = s.length - 1;

    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];

        ++left;
        --right;
    }
}
// @lc code=end
