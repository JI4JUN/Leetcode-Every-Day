/*
 * @lc app=leetcode id=74 lang=typescript
 *
 * [74] Search a 2D Matrix
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function searchMatrix1(matrix: number[][], target: number): boolean {
    const m: number = matrix.length;
    const n: number = matrix[0].length;
    let left: number = 0;
    let right: number = m * n - 1;

    while (left <= right) {
        const mid: number = left + ((right - left) >> 1);
        const x: number = Math.floor(mid / n);
        const y: number = mid % n;
        const midValue: number = matrix[x][y];

        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

// ======================== Approach 2 ======================== //
function searchMatrix(matrix: number[][], target: number): boolean {
    const binarySearch = (
        array: number[]
    ): { found: boolean; index: number } => {
        let left: number = 0;
        let right: number = array.length - 1;

        while (left <= right) {
            const mid: number = left + ((right - left) >> 1);
            const midValue: number = array[mid];

            if (midValue === target) {
                return { found: true, index: mid };
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return { found: false, index: left - 1 };
    };

    const { found, index } = binarySearch(matrix.map((row) => row[0]));

    if (index < 0 || index >= matrix.length) {
        return false;
    }

    return found ? found : binarySearch(matrix[index]).found;
}

// @lc code=end
