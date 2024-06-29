# 131 Palindrome Partitioning

Created: June 27, 2024 10:47 AM
Tags: backtracking, medium

https://leetcode.com/problems/palindrome-partitioning/description/

## 🤔Intuition

The problem is to partition a given string `s` into all arrays of possible substrings such that each substring is a palindrome. To solve this, we can use a backtracking approach combined with a recursive function to explore all possible partitions and check each substring for the palindrome property.

## 📋Approach

### Palindrome Check

**Implement a helper function:** This function compares characters from the beginning and end of the substring, moving towards the center. This approach is usually referred to as the [Two-Pointer](https://www.notion.so/Two-Pointer-8b25b594f863437f9abd69ff0cc77566?pvs=21) method.

```tsx
function isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }

        ++left;
        --right;
    }

    return true;
}
```

### Recursive Backtracking

**Implement a recursive function** `backtrack(s)` **:**

- If the length of `s` is equal to zero which means we already checked all the substrings, append the current `path` to the `result` .
- Iterate over all possible end positions from `i` to the length of the string.
- For each substrings `s.slice(0, i)` , check if it is a palindrome.
- if it is, recursively call `backtrack` with its substring `s.slice(i)` and append the itself to the current `path` .

## 📊Complexity

- **Time complexity:** $O(n * 2^n)$
- **Space complexity:** $O(n^2)$

## 🧑🏻‍💻Code

```tsx
function partition(s: string): string[][] {
    const result: string[][] = [];
    const path: string[] = [];

    const isPalindrome = (str: string): boolean => {
        let left = 0;
        let right = str.length - 1;

        while (left < right) {
            if (str[left] !== str[right]) {
                return false;
            }

            ++left;
            --right;
        }

        return true;
    };

    const backtrack = (s: string): void => {
        const len = s.length;

        if (len === 0) {
            result.push([...path]);

            return;
        }

        for (let i = 1; i <= len; ++i) {
            const possibleStr = s.slice(0, i);

            if (isPalindrome(possibleStr)) {
                path.push(possibleStr);
                backtrack(s.slice(i), path);
                path.pop();
            }
        }
    };

    backtrack(s);

    return result;
}
```

## 📋Optimized Approach

### Palindrome Check

The `isPalindrome` function in the above code uses the [Two-Pointer](https://www.notion.so/Two-Pointer-8b25b594f863437f9abd69ff0cc77566?pvs=21) , but there will be duplicate calculations.

Consider the case “abcde”. It can be directly determined that it is obvious not a palindrome if we already knew that “bcd” is not a palindrome.

In order to avoid unnecessary computation while validating palindromes. Let’s think about what is the necessary and sufficient condition of making a given string `s` of `n` characters to be a palindrome:

- `s[0]` is equal to `s[n - 1]` .
- `s[1 : n - 1]` is palindrome.

Based on this, we can using [Dynamic Programming](https://www.notion.so/Dynamic-Programming-1c57cbbf1f9f4e5394fa09866f072ac5?pvs=21)  to solve the palindrome checking question. 

1. **Initialize DP Table:** Create a 2D Array (DP Table) to store all palindrome checking results of the given string’s substrings (True or False).
2. **Populate DP Table:**
    - All single characters are palindromes, so set `dp[i][i]` to `true` for all i.
    - For substrings of  length 2, set `dp[i][j]` to `true` if `s[i]` is equal to `s[j]` .
    - For substrings of others, use the relation:
        
        if `s[i]` is equal to`s[j]` and `dp[i + 1][j - 1]`  is `true` , then `dp[i][j]`  is `true` .
        

### Recursive Backtracking

**Implement a recursive function** `backtrack(s, startIndex)` **:**

- If `startIndex` is equal to `s.lenght` , append the current `path` to the `result` .
- Iterate over all possible end positions from `start` to `s.lenght` .
- For each end position, query the precomputed DP table to validate palindromes.
- If it is a palindrome, recursively call `backtrack` with itself and the updated `startIndex` , and append the new palindrome to the current `path` .

## 📊Complexity

- **Time complexity:** $O(n * 2^n)$
- **Space complexity:** $O(n^2)$

## 🧑🏻‍💻Code

```tsx
function partition(s: string): string[][] {
    const result: string[][] = [];
    const path: string[] = [];
    const isPalindrome: boolean[][] = []; // dp table

    const computePalindrome = (str: string): void => {
        const sLength = str.length;

        for (let i = 0; i < sLength; ++i) {
            isPalindrome[i] = new Array<boolean>(sLength).fill(false);
        }

        for (let i = sLength - 1; i >= 0; --i) {
            for (let j = i; j < sLength; ++j) {
                if (j === i) {
                    isPalindrome[i][j] = true;
                } else if (j - i === 1) {
                    isPalindrome[i][j] = s[i] === s[j];
                } else {
                    isPalindrome[i][j] =
                        s[i] === s[j] && isPalindrome[i + 1][j - 1];
                }
            }
        }
    };

    const backtrack = (s: string, startIndex: number): void => {
        const sLength = s.length;

        if (startIndex >= sLength) {
            result.push([...path]);

            return;
        }

        for (let i = startIndex; i < sLength; ++i) {
            if (!isPalindrome[startIndex][i]) {
                continue;
            }

            const str = s.substring(startIndex, i + 1);
            path.push(str);
            backtrack(s, i + 1);
            path.pop();
        }
    };

    computePalindrome(s);
    backtrack(s, 0);

    return result;
}
```