# 133 Clone Graph

Created: October 8, 2024 3:39 PM
Difficulty: Medium
Topics: Depth-First Search, Graph, Hash Table
Status: Done

## 📖Description

[Clone Graph](https://leetcode.com/problems/clone-graph/description)

## 🤔Intuition

To solve issues about clone something (return a deep copy), we typically leverage a map to store the mapping between original element and its corresponding clone.

Let’s get back to this problem, for cloning the given graph (deep copy of the graph), we need to traverse over all nodes using graph traversal algorithms (**DFS** or **BFS**), and handle their neighbors on-the-fly.

## 📋Approach One

Approach One is based on **DFS**.

### Implementation of Helper Function `dfs(currNode)`

- Create a clone node `clone` constructed by `currNode.val` .
- Store the mapping between `currNode` and its clone `clone` .
- Traverse over the neighbors of `currNode` ,
    - If `neighbor` has been stored in `nodeMap` , it means that this `neighbor` ’s clone has already created, then get `neighbor` ’s clone from `nodeMap` and push it to the `clone.neighbors` .
    - Otherwise, recursively call function `dfs(neighbor)` to get the deep copy of `neighbor` which neighbors will be addressed during the recursive process. Then, push the result `neighborClone` to the `clone.neighbors` .
- Return the clone of `currNode` .

## 📊Complexity

- **Time Complexity:** $O(V+E)$
- **Space Complexity:** $O(V)$

## 🧑🏻‍💻Code

```tsx
function cloneGraph(node: _Node | null): _Node | null {
    if (node === null) {
        return null;
    }

    const nodeMap: Map<_Node, _Node> = new Map();
    const dfs = (currNode: _Node): _Node => {
        const clone: _Node = new _Node(currNode.val);

        nodeMap.set(currNode, clone);

        currNode.neighbors.forEach((neighbor: _Node): void => {
            if (nodeMap.has(neighbor)) {
                clone.neighbors.push(nodeMap.get(neighbor)!);
            } else {
                const neighborClone: _Node = dfs(neighbor);

                clone.neighbors.push(neighborClone);
            }
        });

        return clone;
    };

    return dfs(node);
}
```

## 📋Approach Two

Approach One is based on **BFS**.

### Step By Step Breakdown

- Create a `queue` initialized to starting node `node` .
- Create a map `nodeMap` initialized to the mapping between starting node and its deep copy `<node, new _Node(node.val)>` .
- Keep running a `while` loop while there are nodes in the `queue` .
    - Dequeue the current node `currNode` .
    - Get the deep copy of `currNode` from `nodeMap` .
    - Traverse over the neighbors of `currNode` ,
        - If `neighbor` has not been stored in `nodeMap` , it means that this `neighbor` has not been cloned.
            - Enqueue this node.
            - Create the deep copy of this `neighbor` node.
            - Set this clone to the `nodeMap` .
            - Push it to the neighbors of current `clone` .
        - Otherwise, directly push deep copy of `neighbor` to the neighbors of current `clone` .
- Return the deep copy of the given `node` .

## 📊Complexity

- **Time Complexity:** $O(V+E)$
- **Space Complexity:** $O(V)$

## 🧑🏻‍💻Code

```tsx
function cloneGraph(node: _Node | null): _Node | null {
    if (node === null) {
        return null;
    }

    const queue: _Node[] = [node];
    const nodeMap: Map<_Node, _Node> = new Map([[node, new _Node(node.val)]]);

    while (queue.length > 0) {
        const currNode: _Node = queue.shift()!;
        const clone: _Node = nodeMap.get(currNode)!;

        currNode.neighbors.forEach((neighbor: _Node): void => {
            if (!nodeMap.has(neighbor)) {
                queue.push(neighbor);
                
                const neighborClone: _Node = new _Node(neighbor.val);
                
                nodeMap.set(neighbor, neighborClone);
                clone.neighbors.push(neighborClone);
            } else {
		            clone.neighbors.push(nodeMap.get(neighbor)!);
            }
        });
    }

    return nodeMap.get(node)!;
}
```

## 🔖Reference

1. [https://leetcode.com/problems/clone-graph/solutions/1792834/c-easy-explanation-dfs](https://leetcode.com/problems/clone-graph/solutions/1792834/c-easy-explanation-dfs)