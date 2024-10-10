/*
 * @lc app=leetcode id=399 lang=typescript
 *
 * [399] Evaluate Division
 */

// @lc code=start
function calcEquation(
    equations: string[][],
    values: number[],
    queries: string[][]
): number[] {
    const result: number[] = new Array(queries.length);
    const variableMap: Map<string, Map<string, number>> = new Map();

    equations.forEach(([left, right], index) => {
        if (!variableMap.has(left)) {
            variableMap.set(left, new Map());
        }
        if (!variableMap.has(right)) {
            variableMap.set(right, new Map());
        }

        variableMap.get(left)!.set(right, values[index]);
        variableMap.get(right)!.set(left, 1 / values[index]);
    });

    const dfs = (from: string, to: string, visited: Set<string>): number => {
        if (from === to) {
            return 1;
        }
        if (!variableMap.has(from)) {
            return -1;
        }

        visited.add(from);

        for (const [neighbor, value] of variableMap.get(from)!.entries()) {
            if (!visited.has(neighbor)) {
                const product: number = dfs(neighbor, to, visited);

                if (product !== -1) {
                    return product * value;
                }
            }
        }

        return -1;
    };

    queries.forEach(([left, right], index) => {
        if (!variableMap.has(left) || !variableMap.has(right)) {
            result[index] = -1;
        } else {
            result[index] = dfs(left, right, new Set());
        }
    });

    return result;
}
// @lc code=end
