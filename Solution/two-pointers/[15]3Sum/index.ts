/*
 * @lc app=leetcode id=15 lang=typescript
 *
 * [15] 3Sum
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function threeSum1(nums: number[]): number[][] {
    const result: number[][] = [];
    const len: number = nums.length;

    nums.sort((a, b) => a - b);

    for (let i = 0, j = -1, k = -1; i < len - 2; ++i) {
        if (nums[i] > 0) {
            break;
        }

        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        j = i + 1;
        k = len - 1;

        while (j < k) {
            const sum: number = nums[i] + nums[j] + nums[k];

            if (sum > 0) {
                --k;
            } else if (sum < 0) {
                ++j;
            } else {
                result.push([nums[i], nums[j], nums[k]]);

                --k;
                ++j;

                while (j < k && nums[k] === nums[k + 1]) {
                    --k;
                }
                while (j < k && nums[j] === nums[j - 1]) {
                    ++j;
                }
            }
        }
    }

    return result;
}

// ======================== Approach 2 ======================== //
function threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    const len: number = nums.length;
    const set: Set<number> = new Set();
    const resultMap: Map<number, Set<number>> = new Map();
    let i: number, j: number, k: number;

    nums.sort((a, b) => a - b);

    for (j = 1; j < len - 1; ++j) {
        set.clear();

        for (i = 0; i < j; ++i) {
            const x: number = nums[i] + nums[j];

            set.add(x);
        }
        for (k = j + 1; k < len; ++k) {
            if (set.has(-nums[k])) {
                const two: number = nums[j];
                const three: number = nums[k];
                const one: number = -two - three;

                if (!resultMap.get(one)?.has(two)) {
                    resultMap.set(one, new Set([two]));

                    result.push([one, two, three]);
                }
            }
        }
    }

    return result;
}
// @lc code=end
