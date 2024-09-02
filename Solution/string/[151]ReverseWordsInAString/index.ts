/*
 * @lc app=leetcode id=151 lang=typescript
 *
 * [151] Reverse Words in a String
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function reverseWords1(s: string): string {
    return s.split(' ').reduce((acc, cur, index) => {
        if (cur === '') {
            return acc;
        } else if (index === 0 || acc === '') {
            return cur;
        } else {
            return `${cur} ${acc}`;
        }
    }, '');
}

// ======================== Approach 2 ======================== //
function reverseWords2(s: string): string {
    return s.split(' ').filter(Boolean).reverse().join(' ');
}

// ======================== Approach 3 ======================== //
function reverseWords(s: string): string {
    return s.trim().split(/\s+/).reverse().join(' ');
}
// @lc code=end
