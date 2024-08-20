import { Call } from './Call';
import { GetV } from './GetV';

/**
 * The abstract operation Invoke is used to call a method of an object.
 *
 * ```markdown
 * Steps:
 * 1. If argumentsList is not present, set argumentsList to a new empty List.
 * 2. Let func be ? GetV(V, P).
 * 3. Return ? Call(func, V, argumentsList).
 * ```
 *
 * @param {*} V An ECMAScript language value.
 * @param {*} P A property key.
 * @param {*} argumentsList A List of ECMAScript language values.
 * @returns Either a normal completion containing an ECMAScript language value or a throw completion.
 */
export function Invoke(V, P, argumentsList) {
    if (argumentsList === undefined) {
        argumentsList = [];
    }

    const func = GetV(V, P);

    return Call(func, V, argumentsList);
}
