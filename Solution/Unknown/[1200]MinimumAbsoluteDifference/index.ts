/*
 * @lc app=leetcode id=1200 lang=typescript
 *
 * [1200] Minimum Absolute Difference
 */

// @lc code=start
function minimumAbsDifference(arr: number[]): number[][] {
    let result: number[][] = [];

    arr.sort((a, b) => a - b);

    for (let i = 1, minDiff = Infinity; i < arr.length; ++i) {
        const diff: number = Math.abs(arr[i] - arr[i - 1]);

        if (diff < minDiff) {
            result = [];
            result.push([arr[i - 1], arr[i]]);
            minDiff = Math.min(minDiff, diff);
        } else if (diff === minDiff) {
            result.push([arr[i - 1], arr[i]]);
        }
    }

    return result;
}
// @lc code=end
