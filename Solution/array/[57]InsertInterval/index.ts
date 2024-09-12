/*
 * @lc app=leetcode id=57 lang=typescript
 *
 * [57] Insert Interval
 */

// @lc code=start
// ======================== Approach 1 ======================== //
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

// ======================== Approach 2 ======================== //
function insert2(intervals: number[][], newInterval: number[]): number[][] {
    const intervalsLen: number = intervals.length;
    const result: number[][] = [];
    let i: number = 0;

    while (i < intervalsLen && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);

        ++i;
    }
    while (i < intervalsLen && intervals[i][0] <= newInterval[1]) {
        newInterval = [
            Math.min(newInterval[0], intervals[i][0]),
            Math.max(newInterval[1], intervals[i][1])
        ];

        ++i;
    }

    result.push(newInterval);

    while (i < intervalsLen) {
        result.push(intervals[i]);

        ++i;
    }

    return result;
}
// @lc code=end
