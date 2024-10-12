/*
 * @lc app=leetcode id=207 lang=typescript
 *
 * [207] Course Schedule
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function canFinish1(numCourses: number, prerequisites: number[][]): boolean {
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

// ======================== Approach 2 ======================== //
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
    const indegrees: number[] = new Array(numCourses).fill(0);
    const queue: number[] = [];
    let count: number = 0;

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
// @lc code=end
