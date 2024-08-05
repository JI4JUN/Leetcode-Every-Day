/*
 * @lc app=leetcode id=242 lang=typescript
 *
 * [242] Valid Anagram
 */

// @lc code=start
function isAnagram(s: string, t: string): boolean {
    const map: Map<string, number> = new Map<string, number>();

    for (const c of s) {
        map.set(c, (map.get(c) ?? 0) + 1);
    }

    for (const c of t) {
        map.set(c, (map.get(c) ?? 0) - 1);
    }

    for (const [_, v] of map.entries()) {
        if (v !== 0) {
            return false;
        }
    }

    return true;
}
// @lc code=end
