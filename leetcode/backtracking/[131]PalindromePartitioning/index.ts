/*
 * @lc app=leetcode id=131 lang=typescript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
function isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str.at(left++) !== str.at(right--)) {
            return false;
        }
    }

    return true;
}

function partition(s: string): string[][] {
    const result: string[][] = [];

    const backtrack = (s: string, result: string[][], path: string[]): void => {
        if (s.length === 0) {
            result.push(path.slice());

            return;
        }

        for (let i = 1; i <= s.length; i++) {
            const possibleStr = s.slice(0, i);

            if (isPalindrome(possibleStr)) {
                path.push(possibleStr);
                backtrack(s.slice(i), result, path);
                path.pop();
            }
        }
    };

    backtrack(s, result, []);

    return result;
}
// @lc code=end
