// import { Completion } from './Completion';

// export function ReturnIfAbrupt(_completion) {
//     if (_completion instanceof Completion) {
//         return _completion.Value;
//     }

//     return _completion;
// }

import { tinyIncludes } from 'Array/includes';
import { Assert } from 'utils/Assert';
import { Completion } from './Completion';

Array.prototype.tinyIncludes = tinyIncludes;

/**
 * https://tc39.es/ecma262/#sec-returnifabrupt
 *
 * ReturnIfAbrupt is used to ensure that any abrupt completions are immediately handled,
 * either by returning them to signal an error or by converting them into a non-abrupt
 * value if they are not exceptional, thus maintaining the flow of the algorithm.
 *
 * ```markdown
 * Steps:
 * 1. Assert: argument is a Completion Record.
 * 2. If argument is an abrupt completion, return Completion(argument).
 * 3. Else, set argument to argument.[[Value]].
 * ```
 *
 * @param {*} argument Abstract Operation.
 * @returns Abstract Operation.
 */
export function ReturnIfAbrupt(argument) {
    Assert(
        argument.hasOwnProperty('Type') &&
            argument.hasOwnProperty('Value') &&
            argument.hasOwnProperty('Target')
    );

    const abruptCompletionValue = ['break', 'continue', 'return', 'throw'];
    const isAbruptCompletion = abruptCompletionValue.tinyIncludes(
        argument.Type
    );

    if (isAbruptCompletion) {
        return Completion(argument);
    } else {
        argument = argument.Value;
    }

    return argument;
}

export { ReturnIfAbrupt as Q };
