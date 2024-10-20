/*
 * @lc app=leetcode id=605 lang=typescript
 *
 * [605] Can Place Flowers
 */

// @lc code=start
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    for (let i = 0; i < flowerbed.length; i++) {
        const current: boolean = flowerbed[i] === 0;
        const left: boolean = i === 0 || flowerbed[i - 1] === 0;
        const right: boolean =
            i === flowerbed.length - 1 || flowerbed[i + 1] === 0;

        if (current && left && right) {
            flowerbed[i] = 1;

            n--;
        }
    }

    return n <= 0;
}
// @lc code=end
