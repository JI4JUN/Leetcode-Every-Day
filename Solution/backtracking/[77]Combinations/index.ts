/*
 * @lc app=leetcode id=77 lang=typescript
 *
 * [77] Combinations
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function combine(n: number, k: number): number[][] {
    const result: number[][] = [];
    const backtrack = (startIndex: number, path: number[]): void => {
        if (path.length === k) {
            result.push([...path]);

            return;
        }

        for (let i = startIndex; i <= n; ++i) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop();
        }
    };

    backtrack(1, []);

    return result;
}

// ======================== Approach 2 ======================== //
function combine2(n: number, k: number): number[][] {
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
    };

    backtrack(n, k, 1);

    return result;
}
// @lc code=end
