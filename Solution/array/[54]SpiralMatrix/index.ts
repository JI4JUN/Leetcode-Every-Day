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
function spiralOrder2(matrix: number[][]): number[] {
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

// ======================== Approach 3 ======================== //

function spiralOrder(matrix: number[][]): number[] {
    enum EDirections {
        Right,
        Down,
        Left,
        Up
    }

    const result: number[] = [];

    let left: number = 0;
    let top: number = 0;
    let right: number = matrix[0].length - 1;
    let bottom: number = matrix.length - 1;
    let dir: number = EDirections.Right;

    while (bottom >= top && right >= left) {
        switch (dir) {
            case EDirections.Right:
                for (let i = left; i <= right; ++i) {
                    result.push(matrix[top][i]);
                }

                dir = EDirections.Down;
                ++top;

                break;
            case EDirections.Down:
                for (let i = top; i <= bottom; ++i) {
                    result.push(matrix[i][right]);
                }

                dir = EDirections.Left;
                --right;

                break;
            case EDirections.Left:
                for (let i = right; i >= left; --i) {
                    result.push(matrix[bottom][i]);
                }

                dir = EDirections.Up;
                --bottom;

                break;
            case EDirections.Up:
                for (let i = bottom; i >= top; --i) {
                    result.push(matrix[i][left]);
                }

                dir = EDirections.Right;
                ++left;

                break;
        }
    }

    return result;
}
// @lc code=end
