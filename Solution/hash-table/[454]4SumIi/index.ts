/*
 * @lc app=leetcode id=454 lang=typescript
 *
 * [454] 4Sum II
 */

// @lc code=start
function fourSumCount(
    nums1: number[],
    nums2: number[],
    nums3: number[],
    nums4: number[]
): number {
    const map: Map<number, number> = new Map();

    for (const n1 of nums1) {
        for (const n2 of nums2) {
            const sum = n1 + n2;

            map.set(sum, (map.get(sum) || 0) + 1);
        }
    }

    let result: number = 0;

    for (const n3 of nums3) {
        for (const n4 of nums4) {
            const target: number = -n3 - n4;

            if (map.has(target)) {
                result += map.get(target)!;
            }
        }
    }

    return result;
}
// @lc code=end
