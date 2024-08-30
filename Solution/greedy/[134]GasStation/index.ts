/*
 * @lc app=leetcode id=134 lang=typescript
 *
 * [134] Gas Station
 */

// @lc code=start
function canCompleteCircuit(gas: number[], cost: number[]): number {
    const len: number = gas.length;

    let startIndex: number = 0;
    let totalSurplus: number = 0;

    for (let i = 0, currentSurplus = 0; i < len; ++i) {
        const surplus: number = gas[i] - cost[i];

        totalSurplus += surplus;
        currentSurplus += surplus;

        if (currentSurplus < 0) {
            currentSurplus = 0;
            startIndex = i + 1;
        }
    }

    return totalSurplus >= 0 ? startIndex : -1;
}
// @lc code=end
