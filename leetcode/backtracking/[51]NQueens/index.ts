/*
 * @lc app=leetcode id=51 lang=typescript
 *
 * [51] N-Queens
 */

// @lc code=start
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const chessboard: string[][] = new Array(n)
        .fill(0)
        .map((_) => new Array(n).fill('.'));

    const isValid = (
        row: number,
        col: number,
        chessboard: string[][]
    ): boolean => {
        for (let i = 0; i < row; i++) {
            if (chessboard[i][col] === 'Q') {
                return false;
            }
        }

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (chessboard[i][j] === 'Q') {
                return false;
            }
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (chessboard[i][j] === 'Q') {
                return false;
            }
        }

        return true;
    };

    const backtrack = (row: number, chessboard: string[][]): void => {
        if (row === n) {
            const tmpArr: string[] = [];
            for (let row of chessboard) {
                tmpArr.push(row.join(''));
            }

            result.push(tmpArr);

            return;
        }

        for (let col = 0; col < n; col++) {
            if (!isValid(row, col, chessboard)) {
                continue;
            }

            chessboard[row][col] = 'Q';
            backtrack(row + 1, chessboard);
            chessboard[row][col] = '.';
        }
    };

    backtrack(0, chessboard);

    return result;
}
// @lc code=end
