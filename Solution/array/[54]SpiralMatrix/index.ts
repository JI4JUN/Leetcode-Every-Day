/*
 * @lc app=leetcode id=54 lang=typescript
 *
 * [54] Spiral Matrix
 */

// ======================== Approach 1 ======================== //
// @lc code=start
function spiralOrder1(matrix: number[][]): number[] {
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

// ======================== Approach 2 ======================== //
function spiralOrder(matrix: number[][]): number[] {
    const result: number[] = [];

    for (
        let start = 0, row = matrix.length, col = matrix[0].length;
        2 * start < row && 2 * start < col;
        ++start
    ) {
        const endX: number = col - start - 1;
        const endY: number = row - start - 1;

        for (let i = start; i <= endX; ++i) {
            result.push(matrix[start][i]);
        }

        if (start < endY) {
            for (let i = start + 1; i <= endY; ++i) {
                result.push(matrix[i][endX]);
            }
        }

        if (start < endX && start < endY) {
            for (let i = endX - 1; i >= start; --i) {
                result.push(matrix[endY][i]);
            }
        }

        if (start < endX && start < endY - 1) {
            for (let i = endY - 1; i >= start + 1; --i) {
                result.push(matrix[i][start]);
            }
        }
    }

    return result;
}
// @lc code=end
