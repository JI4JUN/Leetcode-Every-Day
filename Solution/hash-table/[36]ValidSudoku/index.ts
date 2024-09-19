/*
 * @lc app=leetcode id=36 lang=typescript
 *
 * [36] Valid Sudoku
 */

// @lc code=start
function isValidSudoku1(board: string[][]): boolean {
    const isRowValid = (board: string[][], index: number): boolean => {
        const digitSet: Set<string> = new Set();
        const rowArray: string[] = board[index];

        for (const digit of rowArray) {
            if (digit === '.') {
                continue;
            }
            if (digitSet.has(digit)) {
                return false;
            }

            digitSet.add(digit);
        }

        return true;
    };

    const isColValid = (board: string[][], index: number): boolean => {
        const digitSet: Set<string> = new Set();
        const colArray: string[] = board.reduce((acc, cur) => {
            acc.push(cur[index]);

            return acc;
        }, new Array<string>());

        for (const digit of colArray) {
            if (digit === '.') {
                continue;
            }
            if (digitSet.has(digit)) {
                return false;
            }

            digitSet.add(digit);
        }

        return true;
    };

    const isSubBoxValid = (board: string[][], index: number): boolean => {
        const digitSet: Set<string> = new Set();
        const subBoxTop: number = Math.floor(index / 3) * 3;
        const subBoxLeft: number = (index % 3) * 3;

        for (let i = 0; i < 9; ++i) {
            const digit: string =
                board[subBoxTop + Math.floor(i / 3)][subBoxLeft + (i % 3)];

            if (digit === '.') {
                continue;
            }
            if (digitSet.has(digit)) {
                return false;
            }

            digitSet.add(digit);
        }

        return true;
    };

    for (let i = 0; i < 9; ++i) {
        if (
            !isRowValid(board, i) ||
            !isColValid(board, i) ||
            !isSubBoxValid(board, i)
        ) {
            return false;
        }
    }

    return true;
}

function isValidSudoku(board: string[][]): boolean {
    const rowSets: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const colSets: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const subBoxSets: Set<string>[] = Array.from(
        { length: 9 },
        () => new Set()
    );

    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            const digit: string = board[row][col];

            if (digit === '.') {
                continue;
            }

            const subBoxIndex: number =
                Math.floor(row / 3) * 3 + Math.floor(col / 3);

            if (
                rowSets[row].has(digit) ||
                colSets[col].has(digit) ||
                subBoxSets[subBoxIndex].has(digit)
            ) {
                return false;
            }

            rowSets[row].add(digit);
            colSets[col].add(digit);
            subBoxSets[subBoxIndex].add(digit);
        }
    }

    return true;
}
// @lc code=end
