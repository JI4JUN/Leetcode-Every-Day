/*
 * @lc app=leetcode id=11 lang=typescript
 *
 * [11] Container With Most Water
 */

// @lc code=start
function maxArea(height: number[]): number {
    let left: number = 0;
    let right: number = height.length - 1;
    let maxArea: number = 0;

    while (left < right) {
        const width: number = right - left;
        const heightLeft: number = height[left];
        const heightRight: number = height[right];
        let h: number = 0;

        if (heightLeft <= heightRight) {
            h = heightLeft;
            ++left;
        } else {
            h = heightRight;
            --right;
        }

        maxArea = Math.max(maxArea, h * width);
    }

    return maxArea;
}
// @lc code=end
