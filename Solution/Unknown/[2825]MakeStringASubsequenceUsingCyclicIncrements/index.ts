/*
 * @lc app=leetcode id=2825 lang=typescript
 *
 * [2825] Make String a Subsequence Using Cyclic Increments
 */

// @lc code=start
function canMakeSubsequence(str1: string, str2: string): boolean {
	if (str1.length < str2.length) return false;

	const isValid = (letter1: string, letter2: string): boolean => {
		if (letter1 === letter2) return true;
		if (letter1 === 'z') return letter2 === 'a';

		return letter1.charCodeAt(0) + 1 === letter2.charCodeAt(0);
	};

	let str1Index = 0;
	let str2Index = 0;

	for (let i = 0; i < str1.length; i++) {
		str1Index = i;

		if (isValid(str1[str1Index], str2[str2Index])) {
			while (str1Index < str1.length) {
				if (isValid(str1[str1Index], str2[str2Index])) {
					str2Index++;

					if (str2Index === str2.length) return true;
				}

				str1Index++;
			}

			return false;
		}
	}

	return false;
}
// @lc code=end
