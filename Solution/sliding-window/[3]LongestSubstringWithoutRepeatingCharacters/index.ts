/*
 * @lc app=leetcode id=3 lang=typescript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
    const indexMap: Map<string, number> = new Map();
    let left: number = 0,
        right: number = 0,
        maxLength: number = 0;

    while (right < s.length) {
        if (indexMap.has(s[right])) {
            left = Math.max(indexMap.get(s[right])! + 1, left);
        }

        maxLength = Math.max(maxLength, right - left + 1);
        indexMap.set(s[right], right);

        ++right;
    }

    return maxLength;
}
// @lc code=end
