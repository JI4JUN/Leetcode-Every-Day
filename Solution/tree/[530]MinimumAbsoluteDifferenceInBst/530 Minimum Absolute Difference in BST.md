# 530 Minimum Absolute Difference in BST

Created: September 12, 2024 10:08 PM
Difficulty: Easy
Topics: Tree

## 📖Description

[Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/)

## 🤔Intuition

To find out the minimum absolute difference between the values of any two different nodes in the given BST, we need to traverse over the tree and sort the values of all the nodes, because the difference between adjacent elements in an ordered array is most likely to be the minimum.

However, we can take advantage of the feature of BST’s in-order traversal, which can generate an ordered array from small to large. During the in-order traversal process, we can directly calculate the difference between adjacent nodes without the need for additional space to store values of the nodes, and avoid sorting operations.

## 📋Approach

This approach adopts additional space and requiring sorting operations.

- Create an array `arr` to store all the values of the nodes.
- Implement a helper function `backtrack(node)` which is use to traverse over the given BST by DFS.
    - If the `node` is `null`, means that it has traversed to a leaf node.
    - Append the value of current node to `arr` .
    - Continue traversing the left child node `backtrack(node.left)` .
    - Continue traversing the right child node `backtrack(node.right)` .
- Start iteration `backtrack(root) .`
- After the iteration is completed, sort the `arr` to Incremental array.
- Initialize a variable `minDiff` to track of the minimum absolute difference between the adjacent elements in `arr` .
- Iterate over the `arr` and calculate the difference between adjacent nodes.
- Return `minDiff` .

## 📊Complexity

- **Time complexity:** $O(N + NlogN)$
- **Space complexity:** $O(N)$

## 🧑🏻‍💻Code

```tsx
function getMinimumDifference(root: TreeNode | null): number {
    const arr: number[] = new Array();

    const backtrack = (node: TreeNode | null): void => {
        if (node === null) {
            return;
        }

        const { val, left, right } = node;

        arr.push(val);

        backtrack(left);
        backtrack(right);
    };

    backtrack(root);

    arr.sort((a, b) => a - b);

    let minDiff: number = Infinity;

    for (let i = 1; i < arr.length; ++i) {
        minDiff = Math.min(minDiff, Math.abs(arr[i] - arr[i - 1]));
    }

    return minDiff;
}
```

## 📋Optimized Approach

This approach is based on the in-order traversal of BST.

- Initialize two variables `minDiff` and `preVal` , where `preVal` represents the value of previous node.
- Implement a helper function `inorder(node)` which is use to traverse over the given BST by in-order traversal.
    - If the `node` is `null`, means that it has traversed to a leaf node.
    - Continue traversing the left child node `backtrack(node.left)` .
    - If `preVal` is no equal `null` , it means that the current visited node is no the root of the BST.
        - Update the `minDiff` to the minimum value between itself and the absolute difference between the value of current visited node `node.val` and the value of previously visited node `preVal` .
    - Update `preVal` to `val` .
    - Continue traversing the left child node `backtrack(node.right)` .
- Start iteration `inorder(root)` .
- Return `minDiff` .

## 📊Complexity

- **Time complexity:** $O(N)$
- **Space complexity:** $O(N)$

## 🧑🏻‍💻Code

```tsx
function getMinimumDifference(root: TreeNode | null): number {
    let minDiff: number = Infinity;
    let preVal: number | null = null;

    const inorder = (node: TreeNode | null): void => {
        if (node === null) {
            return;
        }

        const { val, left, right } = node;

        inorder(left);

        if (preVal !== null) {
            minDiff = Math.min(minDiff, Math.abs(val - preVal));
        }

        preVal = val;

        inorder(right);
    };

    inorder(root);

    return minDiff;
}
```

## 🔖Reference

None.