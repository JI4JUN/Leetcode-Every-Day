/*
 * @lc app=leetcode id=6 lang=typescript
 *
 * [6] Zigzag Conversion
 */

// @lc code=start
const Status = {
    UP: 0,
    DOWN: 1
};
function convert(s: string, numRows: number): string {
    if (numRows === 1) {
        return s;
    }

    let result: string[] = new Array(numRows).fill('');
    let currRow: number = -1;
    let state: number = Status.DOWN;

    for (const c of s) {
        state === Status.DOWN ? ++currRow : --currRow;
        result[currRow] += c;

        if (currRow === 0) {
            state = Status.DOWN;
        } else if (currRow === numRows - 1) {
            state = Status.UP;
        }
    }

    return result.join('');
}
// @lc code=end
