# 54 Spiral Matrix

Created: July 21, 2024 12:13 AM
Difficulty: Medium
Topics: Array, Matrix, Simulation

## 📖Description

[Spiral Matrix](https://leetcode.com/problems/spiral-matrix/description/)

## 🤔Intuition

This problem doesn't involve any algorithms, it is just a simulation process, but all the conditions need to be fully considered.

## 📋Approach One

Base on the description of this problem, we convert returning all elements of the matrix in spiral order to returning all the matrix edge-elements in a clockwise order iteratively. 

- Use two points `(start, start)` and `(end, end)` to indicate a matrix.
- After having returned all the current matrix edge-elements, update the `start` and `end` , then the next iteration is going to start in the new matrix (or referred as sub-matrix) which is indicated by new `start` and new `end` .
- Continue the process till `2 * start < row && 2 * start < col` is `true` , means that no sub-matrix will be used to take elements anymore.

### Different Cases of “Final Iteration”

In the last iteration, it may not complete a full “circle” counterclockwise.

![SpiralMarix1.png](SpiralMarix1.png)

We can find there are 4 cases of last iteration after observing the illustration:

- **Case 1:** The last iteration contains the step of **“from left to right”**.
    
    **Current Condition:** No matter what condition.
    
- **Case 2:** The last iteration contains the step of **“from top to bottom”**.
    
    **Current Condition:** The `start` is less than `endY` .
    
- **Case 3:** The last iteration contains the step of **“from right to left”**.
    
    **Current Condition:** The `start` is not only less than `endX` but also less than `endY` .
    
- **Case 4:** The last iteration contains the step of **“from bottom to top”**.
    
    **Current Condition:** The `start` is not only less than `endX` but also less than `endY - 1` .
    

## 📊Complexity

- **Time complexity:** $O(N^2)$
- **Space complexity:** $O(N)$

## 🧑🏻‍💻Code

```tsx
function spiralOrder(matrix: number[][]): number[] {
    const result: number[] = [];

    for (
        let start = 0, row = matrix.length, col = matrix[0].length;
        2 * start < row && 2 * start < col;
        ++start
    ) {
        const endX: number = col - start - 1;
        const endY: number = row - start - 1;

        for (let i = start; i <= endX; ++i) {
            result.push(matrix[start][i]);
        }

        if (start < endY) {
            for (let i = start + 1; i <= endY; ++i) {
                result.push(matrix[i][endX]);
            }
        }

        if (start < endX && start < endY) {
            for (let i = endX - 1; i >= start; --i) {
                result.push(matrix[endY][i]);
            }
        }

        if (start < endX && start < endY - 1) {
            for (let i = endY - 1; i >= start + 1; --i) {
                result.push(matrix[i][start]);
            }
        }
    }

    return result;
}
```

## 📋Approach Two

This approach is consistent in principle with the approach mentioned above, but there will be a different iteration method, just read the code then you will see the difference.

## 📊Complexity

- **Time complexity:** $O(N^2)$
- **Space complexity:** $O(N)$

## 🧑🏻‍💻Code

```tsx
function spiralOrder(matrix: number[][]): number[] {
    enum EDirections {
        Right,
        Down,
        Left,
        Up
    }

    const result: number[] = [];

    let left: number = 0;
    let top: number = 0;
    let right: number = matrix[0].length - 1;
    let bottom: number = matrix.length - 1;
    let dir: number = EDirections.Right;

    while (top <= bottom && left <= right) {
        switch (dir) {
            case EDirections.Right:
                for (let i = left; i <= right; ++i) {
                    result.push(matrix[top][i]);
                }

                dir = EDirections.Down;
                ++top;

                break;
            case EDirections.Down:
                for (let i = top; i <= bottom; ++i) {
                    result.push(matrix[i][right]);
                }

                dir = EDirections.Left;
                --right;

                break;
            case EDirections.Left:
                for (let i = right; i >= left; --i) {
                    result.push(matrix[bottom][i]);
                }

                dir = EDirections.Up;
                --bottom;

                break;
            case EDirections.Up:
                for (let i = bottom; i >= top; --i) {
                    result.push(matrix[i][left]);
                }

                dir = EDirections.Right;
                ++left;

                break;
        }
    }

    return result;
}
```

## 🔖Reference

1. [https://leetcode.com/problems/spiral-matrix/solutions/3506091/c-easy-solution-understand-and-try](https://leetcode.com/problems/spiral-matrix/solutions/3506091/c-easy-solution-understand-and-try)