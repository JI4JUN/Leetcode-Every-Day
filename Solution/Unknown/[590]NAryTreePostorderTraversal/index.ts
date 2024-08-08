/*
 * @lc app=leetcode id=590 lang=typescript
 *
 * [590] N-ary Tree Postorder Traversal
 */

// @lc code=start
/**
 * Definition for node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

function postorder(root: _Node | null): number[] {
    if (root === null) {
        return [];
    }

    const result: number[] = [];

    const traverse = (root: _Node | null, result: number[]): void => {
        if (root.children.length === 0) {
            result.push(root.val);

            return;
        }

        for (const child of root.children) {
            traverse(child, result);
        }

        result.push(root.val);
    };

    traverse(root, result);

    return result;
}
// @lc code=end
