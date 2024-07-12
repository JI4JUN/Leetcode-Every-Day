/*
 * @lc app=leetcode id=37 lang=typescript
 *
 * [37] Sudoku Solver
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    const height: number = board.length;
    const width: number = board[0].length;
    const digits: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const isValid = (row: number, col: number, digit: string): boolean => {
        const subBoxTop: number = Math.floor(row / 3) * 3;
        const subBoxLeft: number = Math.floor(col / 3) * 3;

        for (let i = 0; i < 9; i++) {
            if (
                board[i][col] === digit ||
                board[row][i] === digit ||
                board[subBoxTop + Math.floor(i / 3)][subBoxLeft + (i % 3)] ===
                    digit
            ) {
                return false;
            }
        }

        return true;
    };

    const backtrack = (): boolean => {
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                if (board[row][col] !== '.') {
                    continue;
                }

                for (const digit of digits) {
                    if (isValid(row, col, digit)) {
                        board[row][col] = digit;
                        if (backtrack()) {
                            return true;
                        }
                        board[row][col] = '.';
                    }
                }

                return false;
            }
        }

        return true;
    };

    backtrack();
}
// @lc code=end
