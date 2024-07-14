/*
 * @lc app=leetcode id=367 lang=typescript
 *
 * [367] Valid Perfect Square
 */

// @lc code=start
function isPerfectSquare(num: number): boolean {
    if (num === 1) {
        return true;
    }

    let left: number = 0;
    let right: number = (num >> 1) + 1;

    while (left < right) {
        const mid: number = left + ((right - left) >> 1);
        const square: number = mid * mid;
        if (square < num) {
            left = mid + 1;
        } else if (square > num) {
            right = mid;
        } else {
            return true;
        }
    }

    return false;
}
// @lc code=end
