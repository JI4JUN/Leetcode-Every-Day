/*
 * @lc app=leetcode id=904 lang=typescript
 *
 * [904] Fruit Into Baskets
 */

// @lc code=start
function totalFruit(fruits: number[]): number {
    const treeSet: Set<number> = new Set<number>();
    const treeLen: number = fruits.length;

    let result: number = -Infinity;
    let left: number = 0;
    let right: number = 0;

    while (right < treeLen) {
        treeSet.add(fruits[right]);

        if (treeSet.size > 2) {
            treeSet.delete(fruits[left]);

            right = ++left;
        } else {
            result = Math.max(result, right - left + 1);

            ++right;
        }
    }

    return result === -Infinity ? 0 : result;
}
// @lc code=end
