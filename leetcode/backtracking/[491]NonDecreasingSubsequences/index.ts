/*
 * @lc app=leetcode id=491 lang=typescript
 *
 * [491] Non-decreasing Subsequences
 */

// @lc code=start
// ======================== Approach 0 ======================== //
function findSubsequences(nums: number[]): number[][] {
    const result: number[][] = [];

    const backtrack = (path: number[], startIndex: number): void => {
        if (path.length >= 2) {
            result.push([...path]);
        }

        const visited: Set<number> = new Set();

        for (let i = startIndex; i < nums.length; i++) {
            const num = nums[i];

            if (visited.has(num)) {
                continue;
            }

            if (path.length === 0 || num >= path.at(-1)!) {
                visited.add(num);
                path.push(num);
                backtrack(path, i + 1);
                path.pop();
            }
        }
    };

    backtrack([], 0);

    return result;
}

// ======================== Approach 1 ======================== //
function findSubsequences1(nums: number[]): number[][] {
    const result: number[][] = [];

    const backtrack = (path: number[], startIndex: number): void => {
        if (path.length >= 2) {
            result.push([...path]);
        }

        const visited: number[] = new Array<number>(201).fill(0);

        for (let i = startIndex; i < nums.length; i++) {
            const num = nums[i];

            if (visited[num]) {
                continue;
            }

            if (path.length === 0 || num >= path.at(-1)!) {
                visited[num] = 1;
                path.push(num);
                backtrack(path, i + 1);
                path.pop();
            }
        }
    };

    backtrack([], 0);

    return result;
}
// @lc code=end
