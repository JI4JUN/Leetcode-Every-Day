/*
 * @lc app=leetcode id=387 lang=typescript
 *
 * [387] First Unique Character in a String
 */

// @lc code=start
function firstUniqChar(s: string): number {
    const len: number = s.length;
    const map: Map<number, { count: number; index: number }> = new Map();

    for (let i = 0; i < len; ++i) {
        const c = s[i].charCodeAt(0);

        map.set(c, { count: (map.get(c)?.count || 0) + 1, index: i });
    }

    for (const val of map.values()) {
        if (val.count === 1) {
            return val.index;
        }
    }

    return -1;
}
// @lc code=end
