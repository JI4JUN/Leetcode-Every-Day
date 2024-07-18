/*
 * @lc app=leetcode id=904 lang=typescript
 *
 * [904] Fruit Into Baskets
 */

// @lc code=start
function totalFruit(fruits: number[]): number {
    const fruitsLen: number = fruits.length;
    const backets: Map<number, number> = new Map();

    let result: number = 0;

    for (let left = 0, right = 0; right < fruitsLen; ++right) {
        const rightFruit: number = fruits[right];

        backets.set(rightFruit, (backets.get(rightFruit) ?? 0) + 1);

        while (backets.size > 2) {
            const leftFruit: number = fruits[left];

            backets.set(leftFruit, backets.get(leftFruit)! - 1);

            if (backets.get(leftFruit) === 0) {
                backets.delete(leftFruit);
            }

            ++left;
        }

        result = Math.max(result, right - left + 1);
    }

    return result;
}
// @lc code=end
