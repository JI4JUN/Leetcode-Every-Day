/*
 * @lc app=leetcode.cn id=78 lang=typescript
 *
 * [78] Subsets II
 */

// @lc code=start
function subsets(nums: number[]): number[][] {
    const subsets: number[][] = [];

    const backtrack = (start: number, path: number[]): void => {
        subsets.push([...path]);

        for (let i = start; i < nums.length; ++i) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);

    return subsets;
};
// @lc code=end

