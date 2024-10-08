/*
 * @lc app=leetcode id=133 lang=typescript
 *
 * [133] Clone Graph
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 *
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 *
 */

function cloneGraph(node: _Node | null): _Node | null {
    if (node === null) {
        return null;
    }
    if (node.neighbors.length === 0) {
        return new _Node(node.val);
    }

    const nodeMap: Map<_Node, _Node> = new Map<_Node, _Node>();
    const dfs = (currNode: _Node): _Node => {
        const neighbors: _Node[] = [];
        const clone: _Node = new _Node(currNode.val);

        nodeMap.set(currNode, clone);

        currNode.neighbors.forEach((node: _Node): void => {
            if (nodeMap.has(node)) {
                neighbors.push(nodeMap.get(node)!);
            } else {
                const neighbor: _Node = dfs(node);

                neighbors.push(neighbor);
            }
        });

        clone.neighbors = neighbors;

        return clone;
    };

    return dfs(node);
}
// @lc code=end
