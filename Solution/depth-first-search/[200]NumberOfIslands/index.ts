/*
 * @lc app=leetcode id=200 lang=typescript
 *
 * [200] Number of Islands
 */

// @lc code=start
function numIslands(grid: string[][]): number {
    const m: number = grid.length;
    const n: number = grid[0].length;
    const visited: boolean[][] = Array.from({ length: m }, () =>
        Array(n).fill(false)
    );
    const directions: number[] = [-1, 0, 1, 0, -1];
    const dfs = (r: number, c: number): void => {
        for (let i = 0; i < directions.length; ++i) {
            const x: number = r + directions[i];
            const y: number = c + directions[i + 1];

            if (x >= 0 && x < m && y >= 0 && y < n) {
                if (!visited[x][y] && grid[x][y] === '1') {
                    visited[x][y] = true;

                    dfs(x, y);
                }
            }
        }
    };

    return grid.reduce((result, rows, r) => {
        result = rows.reduce((acc, el, c) => {
            if (!visited[r][c] && el === '1') {
                visited[r][c] = true;

                ++acc;

                dfs(r, c);
            }

            return acc;
        }, result);

        return result;
    }, 0);
}
// @lc code=end