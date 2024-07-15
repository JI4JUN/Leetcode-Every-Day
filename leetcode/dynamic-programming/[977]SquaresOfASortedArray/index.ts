/*
 * @lc app=leetcode id=977 lang=typescript
 *
 * [977] Squares of a Sorted Array
 */

// @lc code=start
function sortedSquares(nums: number[]): number[] {
    const len: number = nums.length;
    const result: number[] = new Array(len);

    let left: number = 0;
    let right: number = len - 1;

    for (let i = len - 1; i >= 0; --i) {
        const leftSquare: number = nums[left] ** 2;
        const rightSquare: number = nums[right] ** 2;

        result[i] =
            leftSquare > rightSquare
                ? (left++, leftSquare)
                : (right--, rightSquare);
    }

    return result;
}
// @lc code=end
