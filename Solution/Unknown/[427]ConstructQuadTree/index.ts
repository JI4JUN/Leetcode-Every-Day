/*
 * @lc app=leetcode id=427 lang=typescript
 *
 * [427] Construct Quad Tree
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: boolean
 *     isLeaf: boolean
 *     topLeft: _Node | null
 * 	topRight: _Node | null
 * 	bottomLeft: _Node | null
 * 	bottomRight: _Node | null
 * 	constructor(val?: boolean, isLeaf?: boolean, topLeft?: _Node, topRight?: _Node, bottomLeft?: _Node, bottomRight?: _Node) {
 *         this.val = (val===undefined ? false : val)
 *         this.isLeaf = (isLeaf===undefined ? false : isLeaf)
 *         this.topLeft = (topLeft===undefined ? null : topLeft)
 *         this.topRight = (topRight===undefined ? null : topRight)
 *         this.bottomLeft = (bottomLeft===undefined ? null : bottomLeft)
 *         this.bottomRight = (bottomRight===undefined ? null : bottomRight)
 *   }
 * }
 */

function construct(grid: number[][]): _Node | null {
    const validLeaf = (
        topX: number,
        topY: number,
        bottomX: number,
        bottomY: number
    ): boolean => {
        const val: number = grid[topX][topY];

        for (let i = topX; i <= bottomX; ++i) {
            for (let j = topY; j <= bottomY; ++j) {
                if (grid[i][j] !== val) {
                    return false;
                }
            }
        }

        return true;
    };
    const recurse = (
        topX: number,
        topY: number,
        bottomX: number,
        bottomY: number
    ): _Node => {
        if (validLeaf(topX, topY, bottomX, bottomY)) {
            return new _Node(grid[topX][topY] === 1, true);
        }

        const root: _Node = new _Node(true, false);

        root.topLeft = recurse(
            topX,
            topY,
            (topX + bottomX) >> 1,
            (topY + bottomY) >> 1
        );
        root.topRight = recurse(
            topX,
            ((topY + bottomY) >> 1) + 1,
            (topX + bottomX) >> 1,
            bottomY
        );
        root.bottomLeft = recurse(
            ((topX + bottomX) >> 1) + 1,
            topY,
            bottomX,
            (topY + bottomY) >> 1
        );
        root.bottomRight = recurse(
            ((topX + bottomX) >> 1) + 1,
            ((topY + bottomY) >> 1) + 1,
            bottomX,
            bottomY
        );

        return root;
    };

    const n: number = grid.length;

    return recurse(0, 0, n - 1, n - 1);
}
// @lc code=end
