/*
 * @lc app=leetcode id=637 lang=typescript
 *
 * [637] Average of Levels in Binary Tree
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

function averageOfLevels(root: TreeNode | null): number[] {
    const queue: TreeNode[] = [root];
    const result: number[] = [];

    while (queue.length > 0) {
        const size: number = queue.length;
        const nodes: number[] = [];

        for (let i = 0; i < size; ++i) {
            const { left, right, val } = queue.shift()!;

            nodes.push(val);

            if (left) {
                queue.push(left);
            }
            if (right) {
                queue.push(right);
            }
        }

        const avg: number =
            nodes.reduce((acc, curr) => acc + curr, 0) / nodes.length;
        result.push(avg);
    }

    return result;
}
// @lc code=end
