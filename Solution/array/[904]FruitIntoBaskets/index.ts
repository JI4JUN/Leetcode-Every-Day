/*
 * @lc app=leetcode id=904 lang=typescript
 *
 * [904] Fruit Into Baskets
 */

// @lc code=start
function totalFruit(fruits: number[]): number {
    const fruitsLen: number = fruits.length;
    const treeMap: Map<number, number> = new Map();

    let result: number = 0;

    for (let left = 0, right = 0; right < fruitsLen; ++right) {
        const rightFruit: number = fruits[right];

        treeMap.set(rightFruit, (treeMap.get(rightFruit) ?? 0) + 1);

        while (treeMap.size > 2) {
            const leftFruit: number = fruits[left];

            treeMap.set(leftFruit, treeMap.get(leftFruit)! - 1);

            if (treeMap.get(leftFruit) === 0) {
                treeMap.delete(leftFruit);
            }

            ++left;
        }

        result = Math.max(result, right - left + 1);
    }

    return result;
}
// @lc code=end
