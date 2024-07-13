/*
 * @lc app=leetcode id=69 lang=typescript
 *
 * [69] Sqrt(x)
 */

// @lc code=start
function mySqrt(x: number): number {
    if (x === 1 || x === 0) {
        return x;
    }

    let left: number = 0;
    let right: number = (x >> 1) + 1;

    while (left < right) {
        const mid: number = left + ((right - left) >> 1);
        const sqrt: number = mid * mid;
        if (sqrt > x) {
            right = mid;
        } else if (sqrt < x) {
            left = mid + 1;
        } else {
            return mid;
        }
    }

    return left - 1;
}
// @lc code=end
