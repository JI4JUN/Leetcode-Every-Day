/*
 * @lc app=leetcode id=73 lang=typescript
 *
 * [73] Set Matrix Zeroes
 */

// @lc code=start
/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes1(matrix: number[][]): void {
    const m: number = matrix.length;
    const n: number = matrix[0].length;
    const rowSet: Set<number> = new Set();
    const columnSet: Set<number> = new Set();

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            if (matrix[row][col] === 0) {
                rowSet.add(row);
                columnSet.add(col);
            }
        }
    }
    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            if (rowSet.has(row) || columnSet.has(col)) {
                matrix[row][col] = 0;
            }
        }
    }
}

function setZeroes(matrix: number[][]): void {
    const m: number = matrix.length;
    const n: number = matrix[0].length;
    const firstElIsZero: boolean = matrix[0][0] === 0;
    let rowFlag: boolean = false;
    let columnFlag: boolean = false;

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            if (matrix[row][col] === 0 && !(row === 0 && col === 0)) {
                if (row === 0) {
                    rowFlag = true;
                }
                if (col === 0) {
                    columnFlag = true;
                }

                matrix[row][0] = -0;
                matrix[0][col] = NaN;
            }
        }
    }

    const fillRow = (row: number): void => {
        matrix[row].fill(0);
    };
    const fillColumn = (column: number): void => {
        for (let row = 0; row < m; ++row) {
            matrix[row][column] = 0;
        }
    };

    for (let row = 1; row < m; ++row) {
        Object.is(matrix[row][0], -0) && fillRow(row);
    }
    for (let col = 1; col < n; ++col) {
        Number.isNaN(matrix[0][col]) && fillColumn(col);
    }

    if (firstElIsZero || (rowFlag && columnFlag)) {
        matrix[0][0] = 0;
    }

    if (Object.is(matrix[0][0], 0)) {
        fillRow(0);
        fillColumn(0);
    } else if (Object.is(matrix[0][0], -0)) {
        fillRow(0);
    } else if (Number.isNaN(matrix[0][0])) {
        fillColumn(0);
    }
}
// @lc code=end
