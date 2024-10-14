# 207 Course Schedule

Created: October 11, 2024 11:20 AM
Difficulty: Medium
Topics: Breadth-First Search, Depth-First Search, Graph, Topological Sort
Status: Done

## 📖Description

[Course Schedule](https://leetcode.com/problems/course-schedule/description)

## 🤔Intuition

This problem can be visualized as a directed graph where courses are nodes and prerequisites are the directed edges. If the directed graph formed by `prerequisites` has a valid [**Topological Ordering**](https://en.wikipedia.org/wiki/Topological_ordering), it indicates that we can finish all courses.

There are two methods to determine the Topological Ordering:

- **DFS Approach.**
- **BFS Approach (Kahn’s Algorithm).**

Here will use these two methods separately to solve this problem.

## 📋Approach One

This approach utilizes **DFS** to traverse the graph.

### Graph Representation (Adjacency List)

Each course can depend on one or more other courses, so we can build a direction graph formed by these relationships. If a course `a` must be taken before course `b` , we draw a directed edge from `a` to `b` .

Take `prerequisites = [[1, 4], [2, 4], [3, 1], [3, 2]]` as an example:

**Illustration**

![CourseSchedule1.png](CourseSchedule1.png)

**Code Implementation**

```tsx
const graph: number[][] = Array.from({ length: numCourses }, () => []);

prerequisites.forEach(([course, preCourse]) => {
	graph[preCourse].push(course);
})
```

### Cycle Detection

For cycle detection in directed graph, we need to track the visitation state of each node using three states:

1. **Not Visited**: Indicate that the node hasn’t been explored yet.
2. **Visiting**: Indicate that the node is currently in the **DFS** process, if we encounter this status again during the current **DFS** process, it means there is a cycle in the directed graph.
3. **Visited**: Indicate that the **DFS** process has been completed, and no cycles were found.

We can maintain an array `visited` ,which length is equal to `numCourses` and initialized to `0` for tracking visited courses.

```tsx
// 0: not visited 1: visiting 2: visited
const visited: number[] = new Array(numCourses).fill(0); 
```

### Define Function `dfs(course)`

The function `dfs(course)` ’s purpose is to explore the graph to detect cycles using **Depth-First Search**. If it finds a cycle, it returns `true` , otherwise, returns `false` .

- If the `course` is already in the visiting state (`visited[course] === 1` ), it means that we found a cycle in this directed graph, and we return `true` .
- If the `course` is already fully explored (`visited[course] === 2` ), it means that there is no cycle in this directed graph, and we return `false` .
- Mark the current `course` as visiting state (`visited[course] === 1` ).
- Explore all neighbors of current `course` recursively:
    - If the result of `dfs(neighbor)` is `true` , it means that there is a cycle from this neighbor, then return `true` .
- Mark all courses has been fully explored from current `course` by setting the visiting state to `2` .
- Return `false` .

```tsx
const dfs = (course: number): boolean => {
    if (visited[course] === 1) {
        return true;
    }
    if (visited[course] === 2) {
        return false;
    }

    visited[course] = 1;

    for (const neighbor of graph[course]) {
        if (dfs(neighbor)) {
            return true;
        }
    }

    visited[course] = 2;

    return false;
};
```

### Execution For All Courses

```tsx
for (let i = 0; i < numCourses; ++i) {
    if (visited[i] === 0 && dfs(i)) {
        return false;
    }
}
```

## 📊Complexity

- **Time Complexity:** $O(V+E)$
- **Space Complexity:** $O(V+E)$

## 🧑🏻‍💻Code

```tsx
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const visited: number[] = new Array(numCourses).fill(0); // 0: not visited 1: visiting 2: visited

    prerequisites.forEach(([course, preCourse]) => {
        graph[preCourse].push(course);
    });

    const dfs = (course: number): boolean => {
        if (visited[course] === 1) {
            return true;
        }
        if (visited[course] === 2) {
            return false;
        }

        visited[course] = 1;

        for (const neighbor of graph[course]) {
            if (dfs(neighbor)) {
                return true;
            }
        }

        visited[course] = 2;

        return false;
    };

    for (let i = 0; i < numCourses; ++i) {
        if (visited[i] === 0 && dfs(i)) {
            return false;
        }
    }

    return true;
}
```

## 📋Approach Two

This approach utilizes **BFS (Kahn’s Algorithm)** to traverse the graph.

### Graph Representation And In-degree Initialization

This approach uses the same way as Approach One to build the directed graph, but we also need to record the in-degree of each node during the graph representation process.

```tsx
const graph: number[][] = Array.from({ length: numCourses }, () => []);
const indegrees: number = new Array(numCourses).fill(0);

prerequisites.forEach(([course, preCourse]) => {
		graph[preCourse].push(course);
		++indegrees[course];
})
```

### Initialize `queue`

The `queue` is used to process courses in **BFS** manner.

```tsx
const queue: number[] = [];

indegrees.forEach((indegree, index) => {
    if (indegree === 0) {
        queue.push(index);
    }
})
```

### Illustration

![CourseSchedule2.png](CourseSchedule2.png)

### Step By Step Breakdown

- Initialize directed graph as an adjacency list `graph` .
- Initialize an array `indegrees` with `0` , which length is equal to `numCourses` .
- Construct the `graph` and calculate the `indegrees` .
- Create the `queue` with courses that have no `prerequisites` .
- Use a variable `count` to track the count of course which has been explored.
- Start a `while` loop for the BFS processing:
    - Increment the `count` by `++count` .
    - Remove a course from the `queue` and use a variable `currCourse` to store it.
    - Iterate through all the neighbors of `currCourse` ,
        - If the in-degree of current neighbor `indegrees[neighbor]` after decrementing is equal to `0` , it means that there are no prerequisites of this current neighbor.
            - Push this neighbor to the `queue` .
- Check if all courses have been processed (`count === numCourses` ).

## 📊Complexity

- **Time Complexity:** $O(V+E)$
- **Space Complexity:** $O(V+E)$

## 🧑🏻‍💻Code

```tsx
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const indegrees: number[] = new Array(numCourses).fill(0);
    
    prerequisites.forEach(([course, preCourse]) => {
        graph[preCourse].push(course);
        ++indegrees[course];
    });
    
    const queue: number[] = [];
    
    indegrees.forEach((count, index) => {
        if (count === 0) {
                queue.push(index);
        }
    })
    
    let count = 0;
    
    while (queue.length > 0) {
        ++count;
        
        const currCourse: number = queue.shift()!;
        
        for (const neighbor of graph[currCourse]) {
            if (--indegrees[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return count === numCourses;
}
```

## 🔖Reference

1. [https://algo.itcharge.cn/08.Graph/02.Graph-Traversal/05.Graph-Topological-Sorting/](https://algo.itcharge.cn/08.Graph/02.Graph-Traversal/05.Graph-Topological-Sorting/)
2. [https://linlexiao.com/2023/03/23/拓扑排序/index.html](https://linlexiao.com/2023/03/23/%E6%8B%93%E6%89%91%E6%8E%92%E5%BA%8F/index.html)