/*
 * @lc app=leetcode id=2406 lang=typescript
 *
 * [2406] Divide Intervals Into Minimum Number of Groups
 */

// @lc code=start
function minGroups(intervals: number[][]): number {
    const map: Map<number, number> = new Map();

    intervals.forEach(([left, right]) => {
        map.set(left, (map.get(left) || 0) + 1);
        map.set(right + 1, (map.get(right + 1) || 0) - 1);
    });

    return [...map.entries()]
        .sort((a, b) => a[0] - b[0])
        .reduce(
            (acc, curr) => {
                const { max, count } = acc;

                return {
                    max: Math.max(max, count + curr[1]),
                    count: count + curr[1]
                };
            },
            { max: 0, count: 0 }
        ).max;
}
// @lc code=end
