/*
 * @lc app=leetcode id=49 lang=typescript
 *
 * [49] Group Anagrams
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function groupAnagrams1(strs: string[]): string[][] {
    const charMap: Map<string, string[]> = new Map();

    for (const letter of strs) {
        const sortedStr = letter.split('').sort().join('');

        if (charMap.has(sortedStr)) {
            charMap.get(sortedStr)!.push(letter);
        } else {
            charMap.set(sortedStr, [letter]);
        }
    }

    return Array.from(charMap.values());
}

// ======================== Approach 2 ======================== //
function groupAnagrams(strs: string[]): string[][] {
    const charMap: Map<string, string[]> = strs.reduce((acc, cur) => {
        const sortedStr = cur.split('').sort().join('');

        if (acc.has(sortedStr)) {
            acc.get(sortedStr)!.push(cur);
        } else {
            acc.set(sortedStr, [cur]);
        }

        return acc;
    }, new Map<string, string[]>());

    return Array.from(charMap.values());
}
// @lc code=end
