/*
 * @lc app=leetcode id=90 lang=typescript
 *
 * [90] Subsets II
 */

// @lc code=start
function subsetsWithDup(nums: number[]): number[][] {
    const subsets: number[][] = [];

    const backtrack = (start: number, path: number[]): void => {
        subsets.push([...path]);

        for (let i = start; i < nums.length; ++i) {
            if (i > start && nums[i] === nums[i - 1]) {
                continue;
            }

            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    };

    nums.sort();
    backtrack(0, []);

    return subsets;
}
// @lc code=end
