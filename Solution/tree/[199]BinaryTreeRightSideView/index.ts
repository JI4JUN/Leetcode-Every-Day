/*
 * @lc app=leetcode id=199 lang=typescript
 *
 * [199] Binary Tree Right Side View
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function rightSideView(root: TreeNode | null): number[] {
    if (root === null) {
        return [];
    }

    const queue: TreeNode[] = [root];
    const result: number[] = new Array();

    while (queue.length) {
        const size: number = queue.length;

        for (let i = 0; i < size; ++i) {
            const { left, right, val } = queue.shift()!;

            if (i === size - 1) {
                result.push(val);
            }
            if (left) {
                queue.push(left);
            }
            if (right) {
                queue.push(right);
            }
        }
    }

    return result;
}
// @lc code=end
