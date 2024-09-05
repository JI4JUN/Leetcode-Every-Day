/*
 * @lc app=leetcode id=205 lang=typescript
 *
 * [205] Isomorphic Strings
 */

// @lc code=start
function isIsomorphic(s: string, t: string): boolean {
    const replaceMap: Map<string, string> = new Map();
    const charSet: Set<string> = new Set();

    for (let i = 0; i < s.length; ++i) {
        const sChar: string = s[i];
        const tChar: string = t[i];

        if (replaceMap.has(sChar)) {
            if (replaceMap.get(sChar)! !== tChar) {
                return false;
            }
        } else {
            if (charSet.has(tChar)) {
                return false;
            }

            replaceMap.set(sChar, tChar);
            charSet.add(tChar);
        }
    }

    return true;
}
// @lc code=end
