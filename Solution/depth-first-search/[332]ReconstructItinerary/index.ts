/*
 * @lc app=leetcode id=332 lang=typescript
 *
 * [332] Reconstruct Itinerary
 */

// @lc code=start
// ======================== Approach 1 ======================== //
function findItinerary1(tickets: string[][]): string[] {
    type TicketsMap = {
        [index: string]: Map<string, number>;
    };
    const ticketsMap: TicketsMap = {};

    tickets.sort((a, b) => a[1].localeCompare(b[1]));
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

// ======================== Approach 2 ======================== //
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
// @lc code=end
