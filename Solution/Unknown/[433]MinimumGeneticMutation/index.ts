/*
 * @lc app=leetcode id=433 lang=typescript
 *
 * [433] Minimum Genetic Mutation
 */

// @lc code=start
function minMutation(
	startGene: string,
	endGene: string,
	bank: string[]
): number {
	const bankSet: Set<string> = new Set(bank);

	if (!bankSet.has(endGene)) {
		return -1;
	}

	const visited: Set<string> = new Set([startGene]);
	const queue: [string, number][] = [[startGene, 0]];

	while (queue.length > 0) {
		const [currGene, steps] = queue.shift()!;

		if (currGene === endGene) {
			return steps;
		}

		for (let i = 0; i < 8; ++i) {
			for (const letter of 'ACGT') {
				const nextGene =
					currGene.substring(0, i) +
					letter +
					currGene.substring(i + 1);

				if (!visited.has(nextGene) && bankSet.has(nextGene)) {
					queue.push([nextGene, steps + 1]);
					visited.add(nextGene);
				}
			}
		}
	}

	return -1;
}
// @lc code=end
