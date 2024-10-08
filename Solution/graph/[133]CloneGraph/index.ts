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
// ======================== Approach 1 ======================== //
function cloneGraph1(node: _Node | null): _Node | null {
    if (node === null) {
        return null;
    }
    if (node.neighbors.length === 0) {
        return new _Node(node.val);
    }

    const nodeMap: Map<_Node, _Node> = new Map();
    const dfs = (currNode: _Node): _Node => {
        const clone: _Node = new _Node(currNode.val);

        nodeMap.set(currNode, clone);

        currNode.neighbors.forEach((node: _Node): void => {
            if (nodeMap.has(node)) {
                clone.neighbors.push(nodeMap.get(node)!);
            } else {
                const neighbor: _Node = dfs(node);

                clone.neighbors.push(neighbor);
            }
        });

        return clone;
    };

    return dfs(node);
}

// ======================== Approach 2 ======================== //
function cloneGraph(node: _Node | null): _Node | null {
    if (node === null) {
        return null;
    }
    if (node.neighbors.length === 0) {
        return new _Node(node.val);
    }

    const nodeMap: Map<_Node, _Node> = new Map([[node, new _Node(node.val)]]);
    const queue: _Node[] = [node];

    while (queue.length > 0) {
        const currNode: _Node = queue.shift()!;
        const clone: _Node = nodeMap.get(currNode)!;

        currNode.neighbors.forEach((node: _Node): void => {
            if (!nodeMap.has(node)) {
                nodeMap.set(node, new _Node(node.val));
                queue.push(node);
            }

            clone.neighbors.push(nodeMap.get(node)!);
        });
    }

    return nodeMap.get(node)!;
}
// @lc code=end
