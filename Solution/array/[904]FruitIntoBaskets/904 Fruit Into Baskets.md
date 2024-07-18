# 904 Fruit Into Baskets

Created: July 16, 2024 7:54 PM
Select: Medium
Topics: Array, Hash Table, Sliding Window

## 📖Description

[Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/description/)

## 🤔Intuition

The description of this problem is simply to find the longest subarray which has only two unique elements.

## 📋Approach

### Illustration

![FruitIntoBaskets](./FruitIntoBaskets.png)

### Sliding Window Approach

- Initialize two pointers `left` and `right` , represent the current window.
- The window keeps track of the current number of elements in the `backets` .
- Start a while loop that continues until the `right` pointer reaches the end of `fruits` .
- Update the `treeSet` by adding the current fruit `fruits[right]` inside the loop.
    - If the number of elements in the `backets` is greater than 2, then shrink the window by deleting the fruit at index `left` to keep the length of the backets `backets.size` no more than 2.
    - After that, let the `left` pointer slide to the next index and update the `right`pointer by the `left` pointer.
    - Otherwise, update the `result` by comparing current `result` and current length of subarray `right - left + 1` , which one is smaller, then let the `right` pointer slide to the next index.

## 📊Complexity

- **Time complexity:** $O(N)$
- **Space complexity:** $O(1)$

## 🧑🏻‍💻Code

```tsx
function totalFruit(fruits: number[]): number {
    const backets: Set<number> = new Set();
    const treeLen: number = fruits.length;

    let result: number = -Infinity;
    let left: number = 0;
    let right: number = 0;

    while (right < treeLen) {
        treeSet.add(fruits[right]);

        if (backets.size > 2) {
            backets.delete(fruits[left++]);

            right = left;
        } else {
            result = Math.max(result, right - left + 1);

            ++right;
        }
    }

    return result === -Infinity ? 0 : result;
}
```