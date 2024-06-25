/*
 * @lc app=leetcode.cn id=216 lang=typescript
 *
 * [216] 组合总和 III
 */

// @lc code=start
function combinationSum3(k: number, n: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];

    if (n < k) {
        return result;
    }

    const backtrack = (n: number, k: number, index: number): void => {
        if (path.length === k && n === 0) {
            result.push([...path]);

            return;
        }

        for (let i = index; i <= 9 - (k - path.length) + 1; i++) {
            path.push(i);
            backtrack(n - i, k, i + 1);
            path.pop();
        }
    }

    backtrack(n, k, 1);

    return result;
};
// @lc code=end

