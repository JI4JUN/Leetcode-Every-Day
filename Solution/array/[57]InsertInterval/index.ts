/*
 * @lc app=leetcode id=57 lang=typescript
 *
 * [57] Insert Interval
 */

// @lc code=start
function insert(intervals: number[][], newInterval: number[]): number[][] {
    const intervalsLen: number = intervals.length;

    if (intervalsLen === 0) {
        return [newInterval];
    }

    const result: number[][] = new Array();

    for (let i = 0; i < intervalsLen; ++i) {
        const [intervalL, intervalR] = intervals[i];
        const [newIntervalL, newIntervalR] = newInterval;

        if (intervalL > newIntervalR) {
            return result.push(...[newInterval, ...intervals.slice(i)]), result;
        } else if (intervalL < newIntervalL && intervalR > newIntervalR) {
            return result.push(...intervals.slice(i)), result;
        } else if (intervalR < newIntervalL) {
            result.push(intervals[i]);
        } else {
            newInterval = [
                Math.min(intervalL, newIntervalL),
                Math.max(intervalR, newIntervalR)
            ];
        }
    }

    result.push(newInterval);

    return result;
}
// @lc code=end
