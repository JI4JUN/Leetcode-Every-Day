/*
 * @lc app=leetcode id=167 lang=typescript
 *
 * [167] Two Sum II - Input Array Is Sorted
 */

// @lc code=start
function twoSum(numbers: number[], target: number): number[] {
    let left: number = 0;
    let right: number = numbers.length - 1;

    while (left < right) {
        const sum: number = numbers[left] + numbers[right];

        if (sum > target) {
            --right;
        } else if (sum < target) {
            ++left;
        } else {
            return [left + 1, right + 1];
        }
    }

    return [];
}
// @lc code=end
