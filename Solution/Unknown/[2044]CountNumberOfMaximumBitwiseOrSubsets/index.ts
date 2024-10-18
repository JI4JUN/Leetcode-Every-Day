/*
 * @lc app=leetcode id=2044 lang=typescript
 *
 * [2044] Count Number of Maximum Bitwise-OR Subsets
 */

// @lc code=start
function countMaxOrSubsets(nums: number[]): number {
    let result: number = 0;
    let maxOR: number = 0;

    nums.forEach((num) => (maxOR |= num));

    const backtrack = (startIndex: number, currentOR: number): void => {
        if (currentOR === maxOR) {
            ++result;
        }

        for (let i = startIndex; i < nums.length; ++i) {
            backtrack(i + 1, currentOR | nums[i]);
        }
    };

    backtrack(0, 0);

    return result;
}
// @lc code=end
