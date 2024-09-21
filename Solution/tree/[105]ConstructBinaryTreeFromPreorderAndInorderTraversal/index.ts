/*
 * @lc app=leetcode id=105 lang=typescript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const backtracking = (
        inorderStart: number,
        inorderEnd: number,
        preorderStart: number,
        preorderEnd: number
    ): TreeNode | null => {
        if (preorderStart === preorderEnd) {
            return null;
        }

        const rootValue: number = preorder[preorderStart];
        const rootNode: TreeNode = new TreeNode(rootValue);
        const rootIndex: number = inorder.indexOf(rootValue, inorderStart);

        rootNode.left = backtracking(
            inorderStart,
            rootIndex,
            preorderStart + 1,
            preorderStart + 1 + rootIndex - inorderStart
        );
        rootNode.right = backtracking(
            rootIndex + 1,
            inorderEnd,
            preorderStart + 1 + rootIndex - inorderStart,
            preorderEnd
        );

        return rootNode;
    };

    return backtracking(0, inorder.length, 0, preorder.length);
}
// @lc code=end
