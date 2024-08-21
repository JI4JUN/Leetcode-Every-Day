/*
 * @lc app=leetcode id=58 lang=typescript
 *
 * [58] Length of Last Word
 */

// @lc code=start
function lengthOfLastWord(s: string): number {
    const trimmed: string = s.trimEnd();

    return trimmed.length - 1 - trimmed.lastIndexOf(' ');
}
// @lc code=end
