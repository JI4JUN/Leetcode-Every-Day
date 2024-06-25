/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 */

// @lc code=start
function combine(n: number, k: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];

    const backtrack = (n: number, k: number, startIndex: number): void => {
        const pathLen = path.length;

        if (pathLen === k) {
            result.push([...path]);

            return;
        }

        for (let i = startIndex; i <= n - (k - pathLen) + 1; i++) {
            path.push(i);
            backtrack(n, k, i + 1);
            path.pop();
        }
    }

    backtrack(n, k, 1);

    return result;
};
// @lc code=end

