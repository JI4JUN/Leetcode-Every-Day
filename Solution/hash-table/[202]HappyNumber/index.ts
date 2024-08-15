/*
 * @lc app=leetcode id=202 lang=typescript
 *
 * [202] Happy Number
 */

// @lc code=start
function isHappy(n: number): boolean {
    const sumSet: Set<number> = new Set();

    const getSumHelper = (num: number): number =>
        num
            .toString()
            .split('')
            .reduce((sum, cur) => sum + Math.pow(Number(cur), 2), 0);

    while (n !== 1 && !sumSet.has(n)) {
        sumSet.add(n);
        n = getSumHelper(n);
    }

    return n === 1;
}
// @lc code=end
