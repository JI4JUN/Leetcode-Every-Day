/*
 * @lc app=leetcode id=17 lang=typescript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
function letterCombinations(digits: string): string[] {
    const result: string[] = [];

    if (['', '0', '1', '*', '#'].includes(digits)) {
        return result;
    }

    const letterMap: { [digits: string]: string[] } = {
        1: [],
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z'],
        0: [],
        '*': [],
        '#': []
    };

    const path: string[] = [];

    const backtrack = (path: string[], currentIdx: number): void => {
        if (currentIdx === digits.length) {
            result.push(path.join(''));

            return;
        }

        const currentArr = letterMap[digits[currentIdx]];
        for (let i = 0; i < currentArr.length; i++) {
            path.push(currentArr[i]);
            backtrack(path, currentIdx + 1);
            path.pop();
        }
    };

    backtrack(path, 0);

    return result;
}
// @lc code=end
