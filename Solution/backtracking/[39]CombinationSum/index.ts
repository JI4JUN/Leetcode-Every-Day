/*
 * @lc app=leetcode id=39 lang=typescript
 *
 * [39] Combination Sum
 */

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];

    const backtrack = (sum: number, path: number[], startIndex: number): void => {
        if (sum > target) {
            return;
        }

        if (sum === target) {
            result.push([...path]);

            return;
        }

        for (let i = startIndex, len = candidates.length; i < len; i++) {
            const candidate: number = candidates[i];

            sum += candidate;
            path.push(candidate);
            backtrack(sum, path, i);
            path.pop();
            sum -= candidate;
        }
    }

    backtrack(0, [], 0);

    return result;
};
// @lc code=end

