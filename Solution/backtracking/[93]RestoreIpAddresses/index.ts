/*
 * @lc app=leetcode id=93 lang=typescript
 *
 * [93] Restore IP Addresses
 */

// @lc code=start
function restoreIpAddresses(s: string): string[] {
    const result: string[] = [];
    const path: string[] = [];

    const isValidIpAddr = (numStr: string): boolean => {
        const len = numStr.length;
        const num = Number(numStr);

        const inValidLen = len > 3;
        const inValidPrefix = len !== 1 && numStr[0] === '0';
        const inValidCharacter = isNaN(num);
        const outRange = num > 255;

        if (inValidLen || inValidPrefix || inValidCharacter || outRange) {
            return false;
        }

        return true;
    };

    const backtrack = (
        s: string,
        dotCount: number,
        remainCount: number
    ): void => {
        if (dotCount === 4 && remainCount === 0 && isValidIpAddr(s)) {
            result.push(path.join('.'));

            return;
        }

        for (let i = 1; i <= s.length; i++) {
            const numStr = s.slice(0, i);
            const numStrLen = numStr.length;

            if (numStrLen <= 3 && isValidIpAddr(numStr)) {
                path.push(numStr);
                dotCount++;
                backtrack(s.slice(i), dotCount, remainCount - numStrLen);
                dotCount--;
                path.pop();
            } else {
                break;
            }
        }
    };

    backtrack(s, 0, s.length);

    return result;
}
// @lc code=end
