/*
 * @lc app=leetcode id=150 lang=typescript
 *
 * [150] Evaluate Reverse Polish Notation
 */

// @lc code=start
function evalRPN(tokens: string[]): number {
    const operators: string[] = ['+', '-', '*', '/'];
    const operandHandler = {
        '+': (numL: number, numR: number) => numL + numR,
        '-': (numL: number, numR: number) => numL - numR,
        '*': (numL: number, numR: number) => numL * numR,
        '/': (numL: number, numR: number) => Math.trunc(numL / numR)
    };

    return tokens
        .reduce((acc, cur) => {
            if (operators.includes(cur)) {
                const numR: number = acc.pop()!;
                const numL: number = acc.pop()!;

                acc.push(operandHandler[cur](numL, numR));
            } else {
                acc.push(Number(cur));
            }

            return acc;
        }, new Array())
        .pop()!;
}
// @lc code=end
