/*
 * @lc app=leetcode id=118 lang=typescript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
function generate(numRows: number): number[][] {
    const result: number[][] = new Array(numRows);

    let row: number = 1;

    while (row <= numRows) {
        const layerArr: number[] = new Array(row);
        const preArr: number[] = result[row - 2] ?? [];

        layerArr[0] = 1;
        layerArr[layerArr.length - 1] = 1;

        for (let i = 1; i < row - 1; ++i) {
            layerArr[i] = preArr[i - 1] + preArr[i];
        }

        result[row - 1] = layerArr;

        ++row;
    }

    return result;
}
// @lc code=end
