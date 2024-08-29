/*
 * @lc app=leetcode id=13 lang=typescript
 *
 * [13] Roman to Integer
 */

// @lc code=start
const symbolMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
};
function romanToInt(s: string): number {
    return s
        .split('')
        .reduce(
            (acc, cur, i) =>
                i > 0 && symbolMap[cur] > symbolMap[s[i - 1]]
                    ? acc - 2 * symbolMap[s[i - 1]] + symbolMap[cur]
                    : acc + symbolMap[cur],
            0
        );
}
// @lc code=end
