import { Call, Get } from 'utils/AbstractOperations/OperationsOnObjects';
import { IsCallable } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import { ToObject } from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.tostring
 *
 * Array.prototype.toString()
 *
 * ```markdown
 * Steps:
 * 1. Let array be ? ToObject(this value).
 * 2. Let func be ? Get(array, "join").
 * 3. If IsCallable(func) is false, set func to the intrinsic function %Object.prototype.toString%.
 * 4. Return ? Call(func, array).
 * ```
 */
export function tinyToString() {
    const array = ToObject(this);
    let func = Get(array, 'join');

    if (IsCallable(func) === false) {
        func = Object.prototype.toString;
    }

    return Call(func, array);
}
