import { IsCallable } from '../TestingAndComparsionOperations';
import { GetV } from './GetV';

/**
 * https://tc39.es/ecma262/#sec-getmethod
 *
 * The abstract operation GetMethod is used to get the value of a specific property of
 * an ECMAScript language value when the value of property is expected to be a function.
 *
 * ```markdown
 * Steps:
 * 1. Let func be ? GetV(V, P).
 * 2. If func is either undefined or null, return undefined.
 * 3. If IsCallable(func) is false, throw a TypeError exception.
 * 4. Return func.
 * ```
 *
 * @param {*} V An ECMAScript language value.
 * @param {*} P A property key.
 * @returns Either a normal completion containing either a function object or undefined, or a throw completion.
 */
export function GetMethod(V, P) {
    const func = GetV(V, P);

    if (func === undefined || func === null) {
        return undefined;
    }

    if (!IsCallable(func)) {
        throw new TypeError(`${P} is not a function`);
    }

    return func;
}
