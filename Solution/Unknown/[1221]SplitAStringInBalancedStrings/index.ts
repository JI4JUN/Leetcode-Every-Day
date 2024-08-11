/*
 * @lc app=leetcode id=1221 lang=typescript
 *
 * [1221] Split a String in Balanced Strings
 */

// @lc code=start
function balancedStringSplit(s: string): number {
    const map: Map<'R' | 'L', number> = new Map();

    let result: number = 0;

    for (const c of s) {
        map.set(c as 'R' | 'L', (map.get(c as 'R' | 'L') || 0) + 1);

        if (map.get('R') === map.get('L')) {
            ++result;

            map.set('R', 0).set('L', 0);
        }
    }

    return result;
}
// @lc code=end
