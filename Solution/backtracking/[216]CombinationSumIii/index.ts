/*
 * @lc app=leetcode id=216 lang=typescript
 *
 * [216] Combination Sum III
 */

// @lc code=start
function combinationSum3(k: number, n: number): number[][] {
    const result: number[][] = [];
    const path: number[] = [];

    if (n < k) {
        return result;
    }

    const backtrack = (n: number, k: number, startIndex: number): void => {
        const len = path.length;

        if (len === k && n === 0) {
            result.push([...path]);

            return;
        }

        for (let i = startIndex; i <= 9 - (k - len) + 1; ++i) {
            if (n - i < 0) {
                return;
            }

            path.push(i);
            backtrack(n - i, k, i + 1);
            path.pop();
        }
    };

    backtrack(n, k, 1);

    return result;
}
// @lc code=end
