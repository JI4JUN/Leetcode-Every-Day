/*
 * @lc app=leetcode id=210 lang=typescript
 *
 * [210] Course Schedule II
 */
// ======================== Approach 1 ======================== //
// @lc code=start
function findOrder1(numCourses: number, prerequisites: number[][]): number[] {
    const result: number[] = [];
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const visited: number[] = new Array(numCourses).fill(0); // 0: not visited 1: visiting 2: visited
    let hasCycle: boolean = false;

    prerequisites.forEach(([course, preCourse]) => {
        graph[preCourse].push(course);
    });

    const dfs = (course: number): void => {
        if (visited[course] === 1) {
            hasCycle = true;

            return;
        }
        if (visited[course] === 2 || hasCycle) {
            return;
        }

        visited[course] = 1;

        for (const neighbor of graph[course]) {
            dfs(neighbor);
        }

        visited[course] = 2;
        result.push(course);
    };

    for (let i = 0; i < numCourses; ++i) {
        if (visited[i] === 0) {
            dfs(i);
        }
    }

    return hasCycle ? [] : result.reverse();
}

// ======================== Approach 2 ======================== //
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const result: number[] = [];
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const indegrees: number[] = new Array(numCourses).fill(0);
    const queue: number[] = [];

    prerequisites.forEach(([course, preCourse]) => {
        graph[preCourse].push(course);
        ++indegrees[course];
    });
    indegrees.forEach((count, index) => {
        if (count === 0) {
            queue.push(index);
        }
    });

    while (queue.length > 0) {
        const currCourse: number = queue.shift()!;

        result.push(currCourse);

        graph[currCourse].forEach((neighbour) => {
            if (--indegrees[neighbour] === 0) {
                queue.push(neighbour);
            }
        });
    }

    return result.length === numCourses ? result : [];
}
// @lc code=end
