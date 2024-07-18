/*
 * @lc app=leetcode id=76 lang=typescript
 *
 * [76] Minimum Window Substring
 */

// @lc code=start
function minWindow(s: string, t: string): string {
    const sLen: number = s.length;
    const tLen: number = t.length;

    if (sLen === 0 || tLen === 0 || sLen < tLen) {
        return '';
    }

    const tMap: Map<string, number> = new Map();
    const winMap: Map<string, number> = new Map();

    for (const c of t) {
        tMap.set(c, (tMap.get(c) ?? 0) + 1);
    }

    let minWinLen: number = Infinity;
    let left: number = 0;
    let right: number = 0;
    let resultLeft: number = 0;

    const isValid = (): boolean => {
        for (const [k, v] of tMap.entries()) {
            if (!winMap.has(k) || winMap.get(k)! < v) {
                return false;
            }
        }

        return true;
    };

    while (right < sLen) {
        const rightChar: string = s[right];

        if (tMap.has(rightChar)) {
            winMap.set(rightChar, (winMap.get(rightChar) ?? 0) + 1);
        }

        while (left <= right && isValid()) {
            const curLen: number = right - left + 1;

            if (Math.min(minWinLen, curLen) === curLen) {
                minWinLen = curLen;
                resultLeft = left;
            }

            const leftChar: string = s[left];

            if (tMap.has(leftChar)) {
                winMap.set(leftChar, winMap.get(leftChar)! - 1);
            }

            ++left;
        }

        ++right;
    }

    return minWinLen === Infinity
        ? ''
        : s.slice(resultLeft, resultLeft + minWinLen);
}
// @lc code=end
