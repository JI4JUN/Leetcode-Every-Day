/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] Combination Sum II
 */

// @lc code=start
function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);

    const result: number[][] = [];
    const len: number = candidates.length;
    const visited: boolean[] = new Array<boolean>(len).fill(false);

    const backtrack = (sum: number, path: number[], startIndex: number): void => {
        if (sum > target) {
            return;
        }

        if (sum === target) {
            result.push([...path]);

            return;
        }

        for (let i = startIndex; i < len; ++i) {
            if (i > 0 && candidates[i] === candidates[i - 1] && !visited[i - 1]) {
                continue;
            }

            const candidate: number = candidates[i];

            sum += candidate;
            path.push(candidate);
            visited[i] = true;
            backtrack(sum, path, i + 1);
            visited[i] = false;
            path.pop();
            sum -= candidate;
        }
    }

    backtrack(0, [], 0);

    return result;
};
// @lc code=end

