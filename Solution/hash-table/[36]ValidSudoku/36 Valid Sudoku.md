# 36 Valid Sudoku

Created: September 19, 2024 3:17 PM
Difficulty: Medium
Topics: Array, Hash Table, Matrix
Status: Done

## 📖Description

[Valid Sudoku](https://leetcode.com/problems/valid-sudoku/description)

## 🤔Intuition

This problem requires us to determine if a given `9 × 9` Suduku board is valid. We can iterate all the filled cells, and validate them according to these three rules:

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

There are two approaches will be presented, the implementation thinking of which are similar, but the first one is easier to understand and the second one is more elegant.

## 📋Approach

Because it is a `9 × 9` Suduku board (means that there are only 9 rows, 9 columns and 9 sub-boxes), we only need to perform 9 validations.

In order to make the code logic clear and easy to understand, we will implement three helper functions ( `isRowValid(index)` , `isColValid(index)` and `isSubBoxValid(index)` ) to deal with the tasks of “rows validation”, “columns validation“ and “sub-boxes validation”, separately.

### Rows Validation

Based on the Rule 1, we need to ensure that there are no duplicate digits in each row. So we can utilize a Hash Table to help us detect duplication.

```tsx
const isRowValid = (index: number): boolean => {
    const digitSet: Set<string> = new Set();
    const rowArray: string[] = board[index];

    for (const digit of rowArray) {
        if (digit === '.') { // Only the filled cells need to be validated.
            continue;
        }
        if (digitSet.has(digit)) {
            return false;
        }

        digitSet.add(digit);
    }

    return true;
};
```

### Columns Validation

Not much different from `isRowValid` .

```tsx
const isColValid = (index: number): boolean => {
    const digitSet: Set<string> = new Set();
    const colArray: string[] = board.reduce((acc, cur) => {
        acc.push(cur[index]);

        return acc;
    }, new Array<string>());

    for (const digit of colArray) {
        if (digit === '.') { // Only the filled cells need to be validated.
            continue;
        }
        if (digitSet.has(digit)) {
            return false;
        }

        digitSet.add(digit);
    }

    return true;
};
```

### Sub-boxes Validation

The crux of sub-boxes validation is to determine the mapping relationship between input `index` and coordinate of sub-boxes. 

```tsx
const isSubBoxValid = (index: number): boolean => {
    const digitSet: Set<string> = new Set();
    const subBoxTop: number = Math.floor(index / 3) * 3; // Only be 0, 3, 6.
    const subBoxLeft: number = (index % 3) * 3; // Only be 0, 3, 6.

    for (let i = 0; i < 9; ++i) {
        const digit: string =
            board[subBoxTop + Math.floor(i / 3)][subBoxLeft + (i % 3)];

        if (digit === '.') { // Only the filled cells need to be validated.
            continue;
        }
        if (digitSet.has(digit)) {
            return false;
        }

        digitSet.add(digit);
    }

    return true;
};
```

## 📊Complexity

- **Time complexity:** $O(3 * 9 * 9)$
- **Space complexity:** $O(4 * 9)$

## 🧑🏻‍💻Code

```tsx
function isValidSudoku(board: string[][]): boolean {
    const isRowValid = (index: number): boolean => {
        const digitSet: Set<string> = new Set();
        const rowArray: string[] = board[index];

        for (const digit of rowArray) {
            if (digit === '.') {
                continue;
            }
            if (digitSet.has(digit)) {
                return false;
            }

            digitSet.add(digit);
        }

        return true;
    };

    const isColValid = (index: number): boolean => {
        const digitSet: Set<string> = new Set();
        const colArray: string[] = board.reduce((acc, cur) => {
            acc.push(cur[index]);

            return acc;
        }, new Array<string>());

        for (const digit of colArray) {
            if (digit === '.') {
                continue;
            }
            if (digitSet.has(digit)) {
                return false;
            }

            digitSet.add(digit);
        }

        return true;
    };

    const isSubBoxValid = (index: number): boolean => {
        const digitSet: Set<string> = new Set();
        const subBoxTop: number = Math.floor(index / 3) * 3;
        const subBoxLeft: number = (index % 3) * 3;

        for (let i = 0; i < 9; ++i) {
            const digit: string =
                board[subBoxTop + Math.floor(i / 3)][subBoxLeft + (i % 3)];

            if (digit === '.') {
                continue;
            }
            if (digitSet.has(digit)) {
                return false;
            }

            digitSet.add(digit);
        }

        return true;
    };

    for (let i = 0; i < 9; ++i) {
        if (!isRowValid(i) || !isColValid(i) || !isSubBoxValid(i)) {
            return false;
        }
    }

    return true;
}
```

## 📋Optimized Approach

In the above approach, we need to iterate over 9 elements while each check. But in fact, we only need a single pass through the `board` .

- Define three sets of array `rowSets` , `colSets` and `subBoxSets` to track digits for rows, columns, and sub-boxes,
    - `rowSets`: Track digits encountered in each row.
    - `colSets`: Track digits encountered in each column.
    - `subBoxSets`: Track digits encountered in each sub-box.
- Pass through the given the given `borad` ,
    - Get the current digit `digit` .
    - If `digit` is `'.'` , skip it.
    - Calculate the coordinate of sub-boxes `subBoxIndex` by `Math.floor(row / 3) * 3 + Math.floor(col / 3)` .
    - Validate repetition of current row, column, and sub-box simultaneously.
    - Update `rowSets` , `colSets` , and `subBoxSets` , separately.

## 📊Complexity

- **Time complexity:** $O(9 * 9)$
- **Space complexity:** $O(3 * 9 * 9)$

## 🧑🏻‍💻Code

```tsx
function isValidSudoku(board: string[][]): boolean {
    const rowSets: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const colSets: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const subBoxSets: Set<string>[] = Array.from(
        { length: 9 },
        () => new Set()
    );

    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            const digit: string = board[row][col];

            if (digit === '.') {
                continue;
            }

            const subBoxIndex: number =
                Math.floor(row / 3) * 3 + Math.floor(col / 3);

            if (
                rowSets[row].has(digit) ||
                colSets[col].has(digit) ||
                subBoxSets[subBoxIndex].has(digit)
            ) {
                return false;
            }

            rowSets[row].add(digit);
            colSets[col].add(digit);
            subBoxSets[subBoxIndex].add(digit);
        }
    }

    return true;
}
```

## 🔖Reference

1. [https://leetcode.com/problems/valid-sudoku/solutions/5272799/video-keep-number-we-found-and-find-duplicate](https://leetcode.com/problems/valid-sudoku/solutions/5272799/video-keep-number-we-found-and-find-duplicate)