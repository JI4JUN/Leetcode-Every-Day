/*
 * @lc app=leetcode id=2109 lang=typescript
 *
 * [2109] Adding Spaces to a String
 */

// @lc code=start
function addSpaces(s: string, spaces: number[]): string {
	const result = new Array(s.length + spaces.length);
	let readIndex = 0;
	let writeIndex = 0;

	for (const spacesIndex of spaces) {
		while (readIndex < spacesIndex) {
			result[writeIndex++] = s[readIndex++];
		}

		result[writeIndex++] = ' ';
	}

	while (readIndex < s.length) {
		result[writeIndex++] = s[readIndex++];
	}

	return result.join('');
}
// @lc code=end
