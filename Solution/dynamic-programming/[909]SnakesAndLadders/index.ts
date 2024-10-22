/*
 * @lc app=leetcode id=909 lang=typescript
 *
 * [909] Snakes and Ladders
 */

// @lc code=start
function snakesAndLadders(board: number[][]): number {
	const n = board.length;
	const visited = new Set<number>();
	const queue: [number, number][] = [[1, 0]]; // [current square, number of rolls]

	// Function to get the next square
	const getNextSquare = (pos: number): number => {
		const row = Math.floor((pos - 1) / n);
		const col = row % 2 === 0 ? (pos - 1) % n : n - 1 - ((pos - 1) % n);
		return board[n - 1 - row][col] === -1 ? pos : board[n - 1 - row][col];
	};

	while (queue.length > 0) {
		const [current, rolls] = queue.shift()!;

		// If we reach the last square, return the number of rolls
		if (current === n * n) {
			return rolls;
		}

		// Try to roll the dice from 1 to 6
		for (let dice = 1; dice <= 6; dice++) {
			const nextSquare = current + dice;

			if (nextSquare <= n * n) {
				const finalSquare = getNextSquare(nextSquare);
				if (!visited.has(finalSquare)) {
					visited.add(finalSquare);
					queue.push([finalSquare, rolls + 1]);
				}
			}
		}
	}

	return -1;
}
// @lc code=end
