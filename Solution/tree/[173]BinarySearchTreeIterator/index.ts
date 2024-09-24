/*
 * @lc app=leetcode id=173 lang=typescript
 *
 * [173] Binary Search Tree Iterator
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
class BSTIterator1 {
    private currIndex: number = 0;
    private nodes: TreeNode[] = [];

    constructor(root: TreeNode | null) {
        this.inorderTraversal(root);
    }

    inorderTraversal(root: TreeNode | null): void {
        if (root === null) {
            return;
        }

        this.inorderTraversal(root.left);
        this.nodes.push(root);
        this.inorderTraversal(root.right);
    }

    next(): number {
        return this.hasNext() ? this.nodes[this.currIndex++].val : -1;
    }

    hasNext(): boolean {
        return this.currIndex < this.nodes.length;
    }
}

// ======================== Approach 2 ======================== //
class BSTIterator {
    private stack: TreeNode[] = [];

    constructor(root: TreeNode | null) {
        this.partial(root);
    }

    partial(root: TreeNode | null): void {
        while (root !== null) {
            this.stack.push(root);
            root = root.left;
        }
    }

    next(): number {
        const currNode: TreeNode = this.stack.pop()!;

        this.partial(currNode.right);

        return currNode.val;
    }

    hasNext(): boolean {
        return this.stack.length > 0;
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end
