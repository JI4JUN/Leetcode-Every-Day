/*
 * @lc app=leetcode id=52 lang=typescript
 *
 * [52] N-Queens II
 */

// @lc code=start
function totalNQueens(n: number): number {
	let result: number = 0;
	const chessboard: string[][] = Array.from({ length: n }, () =>
		new Array(n).fill('.')
	);
	const isValid = (row: number, col: number): boolean => {
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
	const backtrack = (row: number): void => {
		if (row === n) {
			result++;

			return;
		}

		for (let col = 0; col < n; col++) {
			if (!isValid(row, col)) {
				continue;
			}

			chessboard[row][col] = 'Q';
			backtrack(row + 1);
			chessboard[row][col] = '.';
		}
	};

	backtrack(0);

	return result;
}
// @lc code=end
