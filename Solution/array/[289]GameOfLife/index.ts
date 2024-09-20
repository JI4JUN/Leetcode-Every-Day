/*
 * @lc app=leetcode id=289 lang=typescript
 *
 * [289] Game of Life
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
// ======================== Approach 1 ======================== //
function gameOfLife1(board: number[][]): void {
    const m: number = board.length;
    const n: number = board[0].length;
    const directions: number[][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];
    const copyBoard: number[][] = board.map((row) => [...row]);

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            const liveNeighbors: number = directions.reduce((acc, curr) => {
                const [dx, dy] = curr;
                const x: number = row + dx;
                const y: number = col + dy;

                if (x >= 0 && x < m && y >= 0 && y < n) {
                    if (board[x][y] === 1) {
                        ++acc;
                    }
                }

                return acc;
            }, 0);

            if (
                board[row][col] === 1 &&
                (liveNeighbors < 2 || liveNeighbors > 3)
            ) {
                copyBoard[row][col] = 0;
            } else if (board[row][col] === 0 && liveNeighbors === 3) {
                copyBoard[row][col] = 1;
            }
        }
    }

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            board[row][col] = copyBoard[row][col];
        }
    }
}

// ======================== Approach 2 ======================== //
function gameOfLife(board: number[][]): void {
    const m: number = board.length;
    const n: number = board[0].length;
    const directions: number[][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            const liveNeighbors: number = directions.reduce((acc, curr) => {
                const [dx, dy] = curr;
                const x: number = row + dx;
                const y: number = col + dy;

                if (x >= 0 && x < m && y >= 0 && y < n) {
                    if (Math.abs(board[x][y]) === 1) {
                        ++acc;
                    }
                }

                return acc;
            }, 0);

            if (
                board[row][col] === 1 &&
                (liveNeighbors < 2 || liveNeighbors > 3)
            ) {
                board[row][col] = -1;
            } else if (board[row][col] === 0 && liveNeighbors === 3) {
                board[row][col] = 2;
            }
        }
    }

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            const curr: number = board[row][col];

            if (curr === -1) {
                board[row][col] = 0;
            } else if (curr === 2) {
                board[row][col] = 1;
            }
        }
    }
}
// @lc code=end
