/*
 * @lc app=leetcode id=56 lang=typescript
 *
 * [56] Merge Intervals
 */

// @lc code=start
function merge(intervals: number[][]): number[][] {
    return intervals
        .sort((a, b) => a[0] - b[0])
        .reduce((acc, cur, index) => {
            if (0 === index) {
                acc.push(cur);
            } else {
                const lastInterval: number = acc.at(-1)![1];

                if (cur[0] <= lastInterval) {
                    acc.at(-1)![1] = Math.max(cur[1], lastInterval);
                } else {
                    acc.push(cur);
                }
            }

            return acc;
        }, [] as number[][]);
}
// @lc code=end
