import { IsCallable } from '../TestingAndComparsionOperations';

/**
 * ```markdown
 * The abstract operation Call is used to call the [[Call]] internal method of a function object.
 *
 * Steps:
 * 1. If argumentsList is not present, set argumentsList to a new empty List.
 * 2. If IsCallable(F) is false, throw a TypeError exception.
 * 3. Return ? F.[[Call]](V, argumentsList).
 * ```
 *
 * @param {*} F An function object.
 * @param {*} V An ECMAScript language value.
 * @param {*} argumentsList The value passed to the corresponding argument of the internal method.
 * @returns Either a normal completion containing an ECMAScript language value or a throw completion.
 */
export function Call(F, V, argumentsList) {
    if (argumentsList === undefined) {
        argumentsList = [];
    }

    if (!IsCallable(F)) {
        throw new TypeError('F is not callable');
    }

    return F.call(V, ...argumentsList);
}
