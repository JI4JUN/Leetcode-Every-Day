/*
 * @lc app=leetcode id=222 lang=typescript
 *
 * [222] Count Complete Tree Nodes
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
// ======================== Approach 1 ======================== //
function countNodes1(root: TreeNode | null): number {
    const getHeight = (root: TreeNode): number => {
        return root === null ? -1 : 1 + getHeight(root.left);
    };

    const h: number = getHeight(root);

    return h < 0
        ? 0
        : getHeight(root.right) === h - 1
        ? (1 << h) + countNodes(root.right)
        : (1 << (h - 1)) + countNodes(root.left);
}

// ======================== Approach 2 ======================== //
function countNodes(root: TreeNode | null): number {
    const getHeight = (root: TreeNode): number => {
        return root === null ? -1 : 1 + getHeight(root.left);
    };

    let count: number = 0;
    let h: number = getHeight(root);

    while (root) {
        if (getHeight(root.right) === h - 1) {
            count += 1 << h;
            root = root.right;
        } else {
            count += 1 << (h - 1);
            root = root.left;
        }

        --h;
    }

    return count;
}
// @lc code=end
