/*
 * @lc app=leetcode id=54 lang=typescript
 *
 * [54] Spiral Matrix
 */

// @lc code=start
function spiralOrder(matrix: number[][]): number[] {
    const result: number[] = [];
    const arrLen: number = matrix.length;
    const subArrLen: number = matrix[0].length;

    let loopNum: number = arrLen >> 1;
    let indexX: number = 0;
    let indexY: number = 0;
    let x: number = 0;
    let y: number = 0;
    let offset: number = 1;

    const isDone = (): boolean => {
        return result.length === arrLen * subArrLen;
    };

    while (loopNum--) {
        x = indexX;
        y = indexY;

        while (!isDone() && y < subArrLen - offset) {
            result.push(matrix[x][y++]);
        }

        while (!isDone() && x < arrLen - offset) {
            result.push(matrix[x++][y]);
        }

        while (!isDone() && y > indexY) {
            result.push(matrix[x][y--]);
        }

        while (!isDone() && x > indexX) {
            result.push(matrix[x--][y]);
        }

        ++indexX;
        ++indexY;
        ++offset;
    }

    if (arrLen % 2) {
        while (indexY <= subArrLen - offset) {
            result.push(matrix[indexX][indexY++]);
        }
    }

    return result;
}
// @lc code=end
