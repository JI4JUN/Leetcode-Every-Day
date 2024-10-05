/*
 * @lc app=leetcode id=79 lang=typescript
 *
 * [79] Word Search
 */

// @lc code=start
function exist(board: string[][], word: string): boolean {
    const m: number = board.length;
    const n: number = board[0].length;
    const wordLen: number = word.length;
    const directions: number[] = [-1, 0, 1, 0, -1];
    const backtrack = (x: number, y: number, startIndex: number): boolean => {
        if (startIndex === wordLen) {
            return true;
        }

        if (
            x < 0 ||
            x >= m ||
            y < 0 ||
            y >= n ||
            board[x][y] !== word[startIndex]
        ) {
            return false;
        }

        const temp: string = board[x][y];
        board[x][y] = '0';

        for (let i = 0; i < directions.length; ++i) {
            const nextX: number = x + directions[i];
            const nextY: number = y + directions[i + 1];

            if (backtrack(nextX, nextY, startIndex + 1)) {
                return true;
            }
        }

        board[x][y] = temp;

        return false;
    };

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (board[i][j] === word[0] && backtrack(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}
// @lc code=end
