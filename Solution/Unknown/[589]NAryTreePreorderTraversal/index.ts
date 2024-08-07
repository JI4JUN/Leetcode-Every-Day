/*
 * @lc app=leetcode id=589 lang=typescript
 *
 * [589] N-ary Tree Preorder Traversal
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

function preorder(root: _Node | null): number[] {
    if (!root) {
        return [];
    }

    const result: number[] = [root.val];

    const traverse = (children: _Node[]): void => {
        if (children.length === 0) {
            return;
        }

        for (const child of children) {
            result.push(child.val);
            traverse(child.children);
        }
    };

    traverse(root.children);

    return result;
}
// @lc code=end
