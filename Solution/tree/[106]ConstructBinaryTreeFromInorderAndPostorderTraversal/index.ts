/*
 * @lc app=leetcode id=106 lang=typescript
 *
 * [106] Construct Binary Tree from Inorder and Postorder Traversal
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
function buildTree1(inorder: number[], postorder: number[]): TreeNode | null {
    const backtracking = (
        inorderStart: number,
        inorderEnd: number,
        postorderStart: number,
        postorderEnd: number
    ): TreeNode | null => {
        if (postorderStart === postorderEnd) {
            return null;
        }

        const rootValue: number = postorder[postorderEnd - 1];
        const rootNode: TreeNode = new TreeNode(rootValue);
        const rootIndex: number = inorder.indexOf(rootValue, inorderStart);

        rootNode.left = backtracking(
            inorderStart,
            rootIndex,
            postorderStart,
            postorderStart + rootIndex - inorderStart
        );
        rootNode.right = backtracking(
            rootIndex + 1,
            inorderEnd,
            postorderStart + rootIndex - inorderStart,
            postorderEnd - 1
        );

        return rootNode;
    };

    return backtracking(0, inorder.length, 0, postorder.length);
}

// ======================== Approach 2 ======================== //
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (postorder.length === 0) {
        return null;
    }

    const rootValue: number = postorder.pop()!;
    const rootNode: TreeNode = new TreeNode(rootValue);
    const rootIndex: number = inorder.indexOf(rootValue);

    rootNode.left = buildTree(
        inorder.slice(0, rootIndex),
        postorder.slice(0, rootIndex)
    );
    rootNode.right = buildTree(
        inorder.slice(rootIndex + 1),
        postorder.slice(rootIndex)
    );

    return rootNode;
}
// @lc code=end
