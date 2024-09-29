# 380 Insert Delete GetRandom O(1)

Created: September 29, 2024 2:24 PM
Difficulty: Medium
Topics: Array, Hash Table
Status: Done

## 📖Description

[Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/description/)

## 🤔Intuition

This problem requires us to implement the class `RandomizedSet` which member functions ( `insert(val)` , `remove(val)` and `getRandom()` ) runs in average $O(1)$ time complexity.

Before coding, let’s review some data structures and their features first:

- **Array:** Can randomly access any element in the array with $O(1)$ time complexity, and add a new element at the end of array with $O(1)$ time complexity (if it need to reallocate the allocated storage space, it will run in $O(N)$ time). However, the delete operation in array will work in $O(N)$ time complexity.
- **Hash Map:** CRUD operations of Hash Map can run in $O(1)$ time complexity, but the operation of randomly access can not.

Based on the above mentions, it seems that we can combine Array and Hash Map to implement the class `RandomizedSet` .

## 📋Approach

We define two member fields `list` and `map` in the class `RandomizedSet` , where `list` is an array that store the elements and `map` is a hash map that record the mapping relationship between each element and its index in the `list` . Then, we can locate the element waiting to remove by using this `map` .

### `insert(val)`

In function `insert` , we need to store the mapping relationship between each element and its current index (the end of `list` ), while storing a new element to `list` .

- Check if the element `val` is already stored in `map` , if yes, return `false` .
- Otherwise, add the new element `val` to the end of `list` and record mapping relationship between `val` and its current index `this.list.length - 1` .
- Then, return `true` .

```tsx
insert(val: number): boolean {
    if (this.map.has(val)) {
        return false;
    }

    this.list.push(val);
    this.map.set(val, this.list.length - 1);

    return true;
}
```

### `remove(val)`

In function `remove` , we can efficiently get the index of element `val` from `map` , then access this element in the `list` without iteration.

- Check if the element `val` isn’t stored in `map` , if yes, return `false` .
- Get the index of element `val` from `this.map.get(val)` .
- Remove this element from  `list` by resetting `this.list[index]` to the element which index is the end of the `list` .
- Update the mapping relationship between element `this.list[index]` and its new `index` .
- Delete the element `val` from `map` .
- Remove the last element in `list` .
- Then, return `true` .

```tsx
remove(val: number): boolean {
    if (!this.map.has(val)) {
        return false;
    }

    const index: number = this.map.get(val)!;

    this.list[index] = this.list[this.list.length - 1];
    this.map.set(this.list[index], index);
    this.map.delete(val);
    this.list.pop();

    return true;
}
```

### `getRandom()`

For getting random index, we can use `Math.random()` to handle it.

```tsx
getRandom(): number {
    return this.list[Math.floor(Math.random() * this.list.length)];
}
```

## 📊Complexity

- **Time Complexity:** $O(1)$
- **Space Complexity:** $O(N)$

## 🧑🏻‍💻Code

```tsx
class RandomizedSet {
    private list: number[];
    private map: Map<number, number>;

    constructor() {
        this.list = new Array();
        this.map = new Map();
    }

    insert(val: number): boolean {
        if (this.map.has(val)) {
            return false;
        }

        this.list.push(val);
        this.map.set(val, this.list.length - 1);

        return true;
    }

    remove(val: number): boolean {
        if (!this.map.has(val)) {
            return false;
        }

        const index: number = this.map.get(val)!;

        this.list[index] = this.list[this.list.length - 1];
        this.map.set(this.list[index], index);
        this.map.delete(val);
        this.list.pop();

        return true;
    }

    getRandom(): number {
        return this.list[Math.floor(Math.random() * this.list.length)];
    }
}
```

## 🔖Reference

1. [https://leetcode.com/problems/insert-delete-getrandom-o1/solutions/5841924/weird-question-easy-explanation-o-1-time-complexity-for-insert-remove-and-getrandom](https://leetcode.com/problems/insert-delete-getrandom-o1/solutions/5841924/weird-question-easy-explanation-o-1-time-complexity-for-insert-remove-and-getrandom)
2. [https://leetcode.com/problems/insert-delete-getrandom-o1/solutions/4572728/beats-99-84-users-c-java-python-javascript-explained](https://leetcode.com/problems/insert-delete-getrandom-o1/solutions/4572728/beats-99-84-users-c-java-python-javascript-explained)