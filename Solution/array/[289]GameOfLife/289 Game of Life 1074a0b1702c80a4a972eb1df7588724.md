# 289 Game of Life

Created: September 20, 2024 5:08 PM
Difficulty: Medium
Topics: Array, Matrix, Simulation
Status: Done

## 📖Description

[Game of Life](https://leetcode.com/problems/game-of-life/description)

## 🤔Intuition

[Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a very interesting automaton, and this problem requires us to simulate the next generation state based on the given `m × n` gird `board` that represents the current state. Every cell in the current state, where **live** (represented by a `1` ) and **dead** (represented by a `0` ) occur simultaneously, and each cell’s life cycle is following four rules:

1. Any live cell with fewer than two live neighbors dies as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by over-population.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

In short, all we need to do is to record the state of eight neighbors around cell (maybe fewer than eight) that we access, then update the state of this cell based on above four rules.

There are two approaches will be presented, the first one utilizes **extra memory space**, and the second one uses an **in-place** method.

## 📋Approach

### Eight Neighbors Access

To determine the next state of current visited cell, we first need to record the current state of its eight neighbors, then check which rule this visited cell complies with.

We use a 2D array `directions` to store the offset of coordinates, for the convenience of accessing the eight neighbors around the current visited cell.

```tsx
const directions: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
];
```

Taking the current visited cell coordinates as `[row, col]` as an example, we can quickly access various neighbors:

```tsx
for (let i = 0; i < directions.length; ++i) {
		const [dx, dy] = directions[i];
		const x: number = row + dx; // Each neighbor's abscissa.
		const y: number = col + dy; // Each neighbor's ordinate.
}
```

### Live Neighbors Record

We use a variable `liveNeighbors` to record the number of live neighbors.

```tsx
for (let i = 0; i < directions.length; ++i) {
		const [dx, dy] = directions[i];
		const x: number = row + dx; // Each neighbor's abscissa.
		const y: number = col + dy; // Each neighbor's ordinate.

		let liveNeighbors: number = 0;

    if (x >= 0 && x < m && y >= 0 && y < n) { // Solve boundary situations
        if (board[x][y] === 1) {
            ++liveNeighbors;
        }
    }
}
```

### Rules Apply

We use following code to represent Rule 1, Rule3 and Rule4:

```tsx
if (board[row][col] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
		// Current visited cell dies (in the copy board).
		copyBoard[row][col] = 0;
} else if (board[row][col] === 0 && liveNeighbors === 3) {
		// Current visited cell becomes a live cell (in the copy board).
    copyBoard[row][col] = 1;
}
```

### Step By Step Breakdown

- Define `directions` to store the offset of coordinates.
- Create a copy board `copyBoard` initialized by given `board` to store the new state after applying the rules.
- Iterate over each cell in the `board` ,
    - Record the number of current visited cell’s live neighbors.
    - Update the state of current visited cell based on its original state and the number of its live neighbors `liveNeighbors` .
        - If its original state is live ( `1` ) and `liveNeighbors` is less than `2` or greater than `3` , means that it need to apply Rule1 and Rule3 for this cell, update its state to dead ( `0` ).
        - Else if its original state is dead ( `0` ) and `liveNeighbors` is equal to `3` , means that it need to apply Rule4 for this cell, update its state to live ( `1` ).
- After processing every cell, update the original `board` with the next state recorded in `copyBoard` .

## 📊Complexity

- **Time complexity:** $O(M * N)$
- **Space complexity:** $O(M * N)$

## 🧑🏻‍💻Code

```tsx
function gameOfLife(board: number[][]): void {
    const m: number = board.length;
    const n: number = board[0].length;
    const directions: number[][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];
    const copyBoard: number[][] = board.map((row) => [...row]);

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            const liveNeighbors: number = directions.reduce((acc, curr) => {
                const [dx, dy] = curr;
                const x: number = row + dx;
                const y: number = col + dy;

                if (x >= 0 && x < m && y >= 0 && y < n) {
                    if (board[x][y] === 1) {
                        ++acc;
                    }
                }

                return acc;
            }, 0);

            if (
                board[row][col] === 1 &&
                (liveNeighbors < 2 || liveNeighbors > 3)
            ) {
                copyBoard[row][col] = 0;
            } else if (board[row][col] === 0 && liveNeighbors === 3) {
                copyBoard[row][col] = 1;
            }
        }
    }

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            board[row][col] = copyBoard[row][col];
        }
    }
}
```

## 📋Optimized Approach

In order to solve this problem in-place, we can use some other integer value except `1` and `0` as the marker (here we use `2` and `-1` to represent the next states live and dead, separately. 

After processing all cells, update the state of cell marked as `2` to live ( `1` ) and update the state of cell marked as `-1` to dead ( `0` ).

Especially note that if the value of neighbor cell is equal to `-1` , it means that this neighbor cell’s original state is live ( `1` ), but it was marked during the previous processing. So we need to make a small modification to follow code:

```tsx
if (x >= 0 && x < m && y >= 0 && y < n) {
    // if (board[x][y] === 1) {
    //     ++liveNeighbors;
    // }
    if (Math.abs(board[x][y]) === 1) {
        ++liveNeighbors;
    }
}
```

The implementation details of this approach are not significantly different from the Approach One, and we will not give a step by step breakdown here.

## 📊Complexity

- **Time complexity:** $O(M * N)$
- **Space complexity:** $O(1)$

## 🧑🏻‍💻Code

```tsx
function gameOfLife(board: number[][]): void {
    const m: number = board.length;
    const n: number = board[0].length;
    const directions: number[][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            const liveNeighbors: number = directions.reduce((acc, curr) => {
                const [dx, dy] = curr;
                const x: number = row + dx;
                const y: number = col + dy;

                if (x >= 0 && x < m && y >= 0 && y < n) {
                    if (Math.abs(board[x][y]) === 1) {
                        ++acc;
                    }
                }

                return acc;
            }, 0);

            if (
                board[row][col] === 1 &&
                (liveNeighbors < 2 || liveNeighbors > 3)
            ) {
                board[row][col] = -1;
            } else if (board[row][col] === 0 && liveNeighbors === 3) {
                board[row][col] = 2;
            }
        }
    }

    for (let row = 0; row < m; ++row) {
        for (let col = 0; col < n; ++col) {
            const curr: number = board[row][col];

            if (curr === -1) {
                board[row][col] = 0;
            } else if (curr === 2) {
                board[row][col] = 1;
            }
        }
    }
}
```

## 🔖Reference

1. [https://leetcode.com/problems/game-of-life/solutions/5671680/easy-to-understand-begginer-friendly](https://leetcode.com/problems/game-of-life/solutions/5671680/easy-to-understand-begginer-friendly)