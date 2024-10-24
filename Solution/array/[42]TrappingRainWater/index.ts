/*
 * @lc app=leetcode id=42 lang=typescript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
function trap(height: number[]): number {
	let left: number = 0;
	let right: number = height.length - 1;
	let maxLeft: number = 0;
	let maxRight: number = 0;
	let result: number = 0;

	while (left < right) {
		if (height[left] < height[right]) {
			if (height[left] > maxLeft) {
				maxLeft = height[left];
			} else {
				result += maxLeft - height[left];
			}

			++left;
		} else {
			if (height[right] > maxRight) {
				maxRight = height[right];
			} else {
				result += maxRight - height[right];
			}

			--right;
		}
	}

	return result;
}
// @lc code=end
