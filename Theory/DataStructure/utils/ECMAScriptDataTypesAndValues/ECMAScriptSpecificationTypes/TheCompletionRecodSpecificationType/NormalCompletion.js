/**
 * https://tc39.es/ecma262/#sec-normalcompletion
 *
 * The abstract operation NormalCompletion is used to return a normal completion with the
 * value of the given value.
 *
 * ```markdown
 * Steps:
 * 1. Return Completion Record { [[Type]]: NORMAL, [[Value]]: value, [[Target]]: EMPTY }.
 * ```
 *
 * @param {*} value Any value except a Completion Record.
 * @returns A normal completion.
 */
export function NormalCompletion(value) {
    return {
        type: 'NORMAL',
        value: value,
        target: 'EMPTY'
    };
}
