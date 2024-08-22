/*
 * @lc app=leetcode id=58 lang=typescript
 *
 * [58] Length of Last Word
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function lengthOfLastWord1(s: string): number {
    const trimmed: string = s.trimEnd();

    return trimmed.length - 1 - trimmed.lastIndexOf(' ');
}

// ======================== Approach 2 ======================== //
function lengthOfLastWord(s: string): number {
    return (s.split(' ').findLast((s: string) => s !== '') ?? '').length;
}
// @lc code=end
