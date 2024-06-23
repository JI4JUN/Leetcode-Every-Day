/*
 * @lc app=leetcode.cn id=89 lang=typescript
 *
 * [89] 格雷编码
 */

// @lc code=start
function grayCode(n: number): number[] {
    const result: number[] = [0];

    for (let i = 1; i <= n; i++) {
        const len = result.length;

        for (let j = len - 1; j >= 0; j--) {
            result.push(result[j] | (1 << (i - 1)));
        }
    }

    return result;
};
// @lc code=end

