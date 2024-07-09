# 332 Reconstruct Itinerary

Created: July 8, 2024 9:23 AM
Select: Hard
Topics: Depth-First Search, Eulerian Circuit, Graph

## 📖Description

[**Reconstruct Itinerary**](https://leetcode.com/problems/reconstruct-itinerary/)

## 🤔Intuition

The problem can be interpreted as meaning that we are going to use up all the tickets which can be use only once, depart from “JKF”, and visit all airports. We can use Depth-First Search (DFS) method to solve this problem.

## 📋Approach

### **State-space Tree**

![ReconstructItinerary](./ReconstructItinerary.png)

### Sort By Lexical Order

Among multiple valid itineraries, the one with the smallest lexical order is necessary.

```tsx
tickets.sort((a, b) => a[1].localeCompare(b[1]));
```

### Initialize the Graph

We are going to create an adjacency list graph that representation of the flights. In order to avoid endless loop in recursive backtracking, consider the case `tickets = [["JFK", "SFO"], ["SFO", "JFK"]]` , thus, we need to add an additional flag for the count of this flight in the adjacency list. If the `count` is equal to 0, means this arrival airport can not be chosen again.

```tsx
type TicketsMap = {
        [index: string]: Map<string, number>;
    };
const ticketsMap: TicketsMap = {};

for (const [from, to] of tickets) {
    if (!ticketsMap[from]) {
        ticketsMap[from] = new Map();
    }
    ticketsMap[from].set(to, (ticketsMap[from].get(to) ?? 0) + 1);
}
```

### **Recursive Backtracking**

**Implement a recursive function** `backtrack(path)` **:**

- If the length of `path` is equal to length of `tickets + 1` , means there is no more destinations to visit, return `true` .
- Get destinations `to` and `count` by iterating over the current airport’s `targetsMap` .
- If `count > 0` , means this destination `to` is allow to be chosen as the next airport, thus, append it to the `path` , and use `count - 1` to update the value of current `to` ’s `targetsMap` .
- Recursively call `backtrack` with `path` , if the return value is `true` , finish backtracking process.

## 📊Complexity

- **Time complexity: $O(NlogN)$**
- **Space complexity: $O(N)$**

## 🧑🏻‍💻Code

```tsx
function findItinerary(tickets: string[][]): string[] {
    type TicketsMap = {
        [index: string]: Map<string, number>;
    };
    const ticketsMap: TicketsMap = {};

    tickets.sort((a, b) => (a[1] < b[1] ? -1 : 1));
    for (const [from, to] of tickets) {
        if (!ticketsMap[from]) {
            ticketsMap[from] = new Map();
        }
        ticketsMap[from].set(to, (ticketsMap[from].get(to) ?? 0) + 1);
    }

    const result: string[] = ['JFK'];
    const ticketsNum: number = tickets.length;

    const backtrack = (path: string[]): boolean => {
        if (path.length === ticketsNum + 1) {
            return true;
        }

        const targetsMap = ticketsMap[path.at(-1) ?? ''];
        if (targetsMap) {
            for (const [to, count] of targetsMap.entries()) {
                if (count > 0) {
                    path.push(to);
                    targetsMap.set(to, count - 1);
                    if (backtrack(path)) {
                        return true;
                    }
                    targetsMap.set(to, count);
                    path.pop();
                }
            }
        }

        return false;
    };

    backtrack(result);

    return result;
}
```

## 📋Optimized Approach

The above approach is actually more in line with the solution of backtracking problems. In fact, the goal of solving this problem can be regard as finding an Eulerian path or circuit that sticks to smallest lexical order in an Eulerian graph or semi-Eulerian graph composed of flights. There is a efficient way ($O(E)$, i.e., linear time) to find the path/circuit —— Hierholzer’s Algorithm.

### Hierholzer’s Algorithm

- Choose an suitable starting vertex, e.g., `"JFK"` in this problem.
- Keep following unused edges and removing them until we get stuck.
- Once we get stuck, append the current vertex to `result` , and backtrack to the nearest vertex in our current `path` that has unused edges.
- Repeat this process until all the edges have been used.

## 📊Complexity

- **Time complexity: $O(NlogN)$**
- **Space complexity: $O(N)$**

## 🧑🏻‍💻Code

```tsx
function findItinerary(tickets: string[][]): string[] {
    type TicketsMap = {
        [index: string]: string[];
    };
    const ticketsMap: TicketsMap = {};

    for (const [from, to] of tickets) {
        ticketsMap[from] = ticketsMap[from] ?? [];
        ticketsMap[from].push(to);
    }

    for (const [from] of tickets) {
        ticketsMap[from].sort();
    }

    const result: string[] = [];

    const dfs = (airport: string): void => {
        const destinations: string[] = ticketsMap[airport] ?? [];
        while (destinations.length > 0) {
            dfs(destinations.shift()!);
        }

        result.push(airport);
    };

    dfs('JFK');

    return result.reverse();
}
```