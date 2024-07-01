/*
 * @lc app=leetcode id=131 lang=typescript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
// ======================== Approach 0 ======================== //
function partition(s: string): string[][] {
    const result: string[][] = [];
    const path: string[] = [];

    const isPalindrome = (str: string): boolean => {
        let left = 0;
        let right = str.length - 1;

        while (left < right) {
            if (str[left] !== str[right]) {
                return false;
            }

            ++left;
            --right;
        }

        return true;
    };

    const backtrack = (s: string): void => {
        const len = s.length;

        if (len === 0) {
            result.push([...path]);

            return;
        }

        for (let i = 1; i <= len; ++i) {
            const possibleStr = s.slice(0, i);

            if (isPalindrome(possibleStr)) {
                path.push(possibleStr);
                backtrack(s.slice(i));
                path.pop();
            }
        }
    };

    backtrack(s);

    return result;
}

//======================== Approach 1 ======================== //
function partition1(s: string): string[][] {
    const result: string[][] = [];
    const path: string[] = [];
    const isPalindrome: boolean[][] = [];

    const computePalindrome = (str: string): void => {
        const sLength = str.length;

        for (let i = 0; i < sLength; ++i) {
            isPalindrome[i] = new Array<boolean>(sLength).fill(false);
        }

        for (let i = sLength - 1; i >= 0; --i) {
            for (let j = i; j < sLength; ++j) {
                if (j === i) {
                    isPalindrome[i][j] = true;
                } else if (j - i === 1) {
                    isPalindrome[i][j] = s[i] === s[j];
                } else {
                    isPalindrome[i][j] =
                        s[i] === s[j] && isPalindrome[i + 1][j - 1];
                }
            }
        }
    };

    const backtrack = (s: string, startIndex: number): void => {
        const sLength = s.length;

        if (startIndex >= sLength) {
            result.push([...path]);

            return;
        }

        for (let i = startIndex; i < sLength; ++i) {
            if (!isPalindrome[startIndex][i]) {
                continue;
            }

            const possibleStr = s.substring(startIndex, i + 1);
            path.push(possibleStr);
            backtrack(s, i + 1);
            path.pop();
        }
    };

    computePalindrome(s);
    backtrack(s, 0);

    return result;
}
// @lc code=end
