/*
 * @lc app=leetcode id=201 lang=typescript
 *
 * [201] Bitwise AND of Numbers Range
 */

// @lc code=start
function rangeBitwiseAnd(left: number, right: number): number {
    let count: number = 0;

    while (left < right) {
        left >>= 1;
        right >>= 1;
        ++count;
    }

    return left << count;
}
// @lc code=end
