/*
 * @lc app=leetcode id=559 lang=typescript
 *
 * [559] Maximum Depth of N-ary Tree
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *
 *     constructor(val?: number, children?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */

function maxDepth(root: _Node | null): number {
    if (!root) {
        return 0;
    }

    let maxDepth: number = 0;

    const traverse = (children: _Node[], depth: number): void => {
        if (!children.length) {
            maxDepth = Math.max(maxDepth, depth);
        }

        for (const child of children) {
            ++depth;
            traverse(child.children, depth);
            --depth;
        }
    };

    traverse(root.children, 1);

    return maxDepth;
}
// @lc code=end
