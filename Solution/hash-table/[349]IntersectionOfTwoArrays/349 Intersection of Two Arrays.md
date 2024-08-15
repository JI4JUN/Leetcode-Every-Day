# 349 Intersection of Two Arrays

Created: August 14, 2024 11:59 PM
Difficulty: Easy
Topics: Array, Hash Table

## 📖Description

[Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/description/)

## 🤔Intuition

To solve this problem, we can use a `Set` to store unique elements of `nums1` , and check if the elements of `nums2` match those in the `Set`.

> If the API `Set.prototype.intersection()`can be used in TypeScript, it would be excellent.
> 

## 📋Approach

- Create a `Set` initialized by `nums1` .
- Iterate over the `num2` , and check if the current element is in `set` .
    - If `set.has(n)` is `true` , append `n` to `result` , and delete it from the `set` .
    - Otherwise, continue iterating.

## 📊Complexity

- **Time complexity:** $O(N+M)$
- **Space complexity:** $O(N)$

## 🧑🏻‍💻Code

```tsx
function intersection(nums1: number[], nums2: number[]): number[] {
    const set: Set<number> = new Set(nums1);
    const result: number[] = [];

    for (const n of nums2) {
        if (set.has(n)) {
            result.push(n);
            set.delete(n);
        }
    }

    return result;
}
```

## 📋Optimized Approach

We can use one line solution. This approach use the `Set` to remove the duplicates from the intersection of the two arrays `num1` and `num2` .

## 📊Complexity

- **Time complexity:** $O(N+M)$
- **Space complexity:** $O(N)$

## 🧑🏻‍💻Code

```tsx
function intersection(nums1: number[], nums2: number[]): number[] {
    return [...new Set(nums1.filter((n) => nums2.includes(n)))];
}
```

## 🔖Reference

None