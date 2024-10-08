/*
 * @lc app=leetcode id=130 lang=typescript
 *
 * [130] Surrounded Regions
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
    const m: number = board.length;
    const n: number = board[0].length;
    const directions: number[] = [-1, 0, 1, 0, -1];
    const dfs = (r: number, c: number): void => {
        for (let i = 0; i < directions.length; ++i) {
            const x: number = r + directions[i];
            const y: number = c + directions[i + 1];

            if (x >= 0 && x < m && y >= 0 && y < n) {
                if (board[x][y] === 'O') {
                    board[x][y] = '#';

                    dfs(x, y);
                }
            }
        }
    };

    for (let row = 0; row < m; ++row) {
        if (board[row][0] === 'O') {
            board[row][0] = '#';

            dfs(row, 0);
        }
        if (board[row][n - 1] === 'O') {
            board[row][n - 1] = '#';

            dfs(row, n - 1);
        }
    }
    for (let col = 0; col < n; ++col) {
        if (board[0][col] === 'O') {
            board[0][col] = '#';

            dfs(0, col);
        }
        if (board[m - 1][col] === 'O') {
            board[m - 1][col] = '#';

            dfs(m - 1, col);
        }
    }

    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === 'O') {
                board[i][j] = 'X';
            } else if (cell === '#') {
                board[i][j] = 'O';
            }
        });
    });
}
// @lc code=end
