/*
 * @lc app=leetcode id=452 lang=typescript
 *
 * [452] Minimum Number of Arrows to Burst Balloons
 */

// @lc code=start
function findMinArrowShots(points: number[][]): number {
    return points
        .sort((a, b) => a[1] - b[1])
        .reduce(
            (acc, cur, index) => {
                if (index === 0) {
                    return acc;
                }

                let { result, preEnd } = acc;

                if (cur[0] > preEnd) {
                    ++result;

                    preEnd = cur[1];
                }

                return { result, preEnd };
            },
            { result: 1, preEnd: points[0][1] }
        ).result;
}
// @lc code=end
