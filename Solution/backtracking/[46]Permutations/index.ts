/*
 * @lc app=leetcode id=46 lang=typescript
 *
 * [46] Permutations
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function permute1(nums: number[]): number[][] {
    const length = nums.length;

    const result: number[][] = [];
    const visited: boolean[] = new Array<boolean>(length).fill(false);

    const backtrack = (path: number[]): void => {
        if (path.length === length) {
            result.push([...path]);

            return;
        }

        for (let i = 0; i < length; ++i) {
            if (visited[i]) {
                continue;
            }

            path.push(nums[i]);
            visited[i] = true;
            backtrack(path);
            visited[i] = false;
            path.pop();
        }
    };

    backtrack([]);

    return result;
}

// ======================== Approach 2 ======================== //
function permute(nums: number[]): number[][] {
    const length = nums.length;

    const result: number[][] = [];

    const backtrack = (first: number): void => {
        if (first === length) {
            result.push([...nums]);

            return;
        }

        for (let i = first; i < length; ++i) {
            [nums[i], nums[first]] = [nums[first], nums[i]];
            backtrack(first + 1);
            [nums[i], nums[first]] = [nums[first], nums[i]];
        }
    };

    backtrack(0);

    return result;
}
// @lc code=end
