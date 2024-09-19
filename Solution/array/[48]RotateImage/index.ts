/*
 * @lc app=leetcode id=48 lang=typescript
 *
 * [48] Rotate Image
 */

// @lc code=start
/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const matrixLength: number = matrix.length;

    for (let start = 0; 2 * start < matrixLength - 1; ++start) {
        for (let i = start; i < matrixLength - 1 - start; ++i) {
            const temp: number = matrix[start][i];

            matrix[start][i] = matrix[matrixLength - 1 - i][start];
            matrix[matrixLength - 1 - i][start] =
                matrix[matrixLength - 1 - start][matrixLength - 1 - i];
            matrix[matrixLength - 1 - start][matrixLength - 1 - i] =
                matrix[i][matrixLength - 1 - start];
            matrix[i][matrixLength - 1 - start] = temp;
        }
    }
}
// @lc code=end
