/*
 * @lc app=leetcode id=59 lang=typescript
 *
 * [59] Spiral Matrix II
 */

// @lc code=start
function generateMatrix(n: number): number[][] {
    const matrix: number[][] = new Array(n).fill(0).map((_) => new Array(n));

    let loopNum: number = n >> 1;
    let offset: number = n - 1;
    let startX: number = 0;
    let startY: number = 0;
    let value: number = 1;
    let x: number = 0;
    let y: number = 0;

    while (loopNum--) {
        x = startX;
        y = startY;

        while (x < startX + offset) {
            matrix[y][x++] = value++;
        }

        while (y < startY + offset) {
            matrix[y++][x] = value++;
        }

        while (x > startX) {
            matrix[y][x--] = value++;
        }

        while (y > startY) {
            matrix[y--][x] = value++;
        }

        ++startX;
        ++startY;
        offset -= 2;
    }

    if (n % 2) {
        matrix[startX][startY] = value;
    }

    return matrix;
}
// @lc code=end
