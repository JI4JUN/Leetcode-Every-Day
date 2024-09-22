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
// ======================== Approach 1 ======================== //
function buildTree1(preorder: number[], inorder: number[]): TreeNode | null {
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

// ======================== Approach 2 ======================== //
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) {
        return null;
    }

    const rootValue: number = preorder.shift()!;
    const rootNode: TreeNode = new TreeNode(rootValue);
    const rootIndex: number = inorder.indexOf(rootValue);

    rootNode.left = buildTree(
        preorder.slice(0, rootIndex),
        inorder.slice(0, rootIndex)
    );
    rootNode.right = buildTree(
        preorder.slice(rootIndex),
        inorder.slice(rootIndex + 1)
    );

    return rootNode;
}
// @lc code=end
