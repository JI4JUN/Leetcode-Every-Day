/*
 * @lc app=leetcode id=51 lang=typescript
 *
 * [51] N-Queens
 */

// ======================== Approach 1 ======================== //
// @lc code=start
function solveNQueens1(n: number): string[][] {
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

// ======================== Approach 2 ======================== //
function solveNQueens2(n: number): string[][] {
    const result: string[][] = [];
    const column: number[] = new Array(n).fill(0);

    const isValid = (row: number, col: number): boolean => {
        for (let r = 0; r < row; r++) {
            const c = column[r];

            if (row + col === r + c || row - col === r - c) {
                return false;
            }
        }

        return true;
    };

    const backtrack = (r: number, colSet: Set<number>): void => {
        if (r === n) {
            result.push(
                column.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c))
            );

            return;
        }

        for (const c of colSet) {
            if (isValid(r, c)) {
                column[r] = c;
                const s = new Set(colSet);
                s.delete(c);
                backtrack(r + 1, s);
            }
        }
    };

    backtrack(0, new Set([...new Array(n).keys()]));

    return result;
}

// ======================== Approach 3 ======================== //
function solveNQueens3(n: number): string[][] {
    const result: string[][] = [];
    const column: number[] = new Array(n).fill(0);
    const visited: boolean[] = new Array(n).fill(false);

    const isValid = (row: number, col: number): boolean => {
        for (let r = 0; r < row; r++) {
            const c = column[r];

            if (row + col === r + c || row - col === r - c) {
                return false;
            }
        }

        return true;
    };

    const backtrack = (r: number): void => {
        if (r === n) {
            result.push(
                column.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c))
            );

            return;
        }

        for (let c = 0; c < n; c++) {
            if (!visited[c] && isValid(r, c)) {
                column[r] = c;
                visited[c] = true;
                backtrack(r + 1);
                visited[c] = false;
            }
        }
    };

    backtrack(0);

    return result;
}

// ======================== Approach 4 ======================== //
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const column: number[] = new Array(n).fill(0);
    const visited: boolean[] = new Array(n).fill(false);
    const diagonal1: boolean[] = new Array(2 * n - 1).fill(false);
    const diagonal2: boolean[] = new Array(2 * n - 1).fill(false);

    const backtrack = (r: number): void => {
        if (r === n) {
            result.push(
                column.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c))
            );

            return;
        }

        for (let c = 0; c < n; c++) {
            const diagIndex1 = r + c;
            const diagIndex2 = r - c + n - 1; // diagIndex2 can be r - c while using JS/TS
            if (
                !visited[c] &&
                !diagonal1[diagIndex1] &&
                !diagonal2[diagIndex2]
            ) {
                column[r] = c;
                visited[c] =
                    diagonal1[diagIndex1] =
                    diagonal2[diagIndex2] =
                        true;
                backtrack(r + 1);
                visited[c] =
                    diagonal1[diagIndex1] =
                    diagonal2[diagIndex2] =
                        false;
            }
        }
    };

    backtrack(0);

    return result;
}
// @lc code=end
