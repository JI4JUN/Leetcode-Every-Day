/*
 * @lc app=leetcode.cn id=526 lang=typescript
 *
 * [526] 优美的排列
 */

// @lc code=start
function countArrangement(n: number): number {
    let result: number = 0;

    const visted = new Array<boolean>(n + 1).fill(false);

    const backtrack = (index: number): void => {
        if (index === n + 1) {
            result++;

            return;
        }

        for (let i = 1; i <= n; i++) {
            if ((!(i % index) || !(index % i)) && !visted[i]) {
                visted[i] = true;
                backtrack(index + 1);
                visted[i] = false;
            }
        }
    }

    backtrack(1);

    return result;
};
// @lc code=end

