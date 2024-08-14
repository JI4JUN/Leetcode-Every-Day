import { ToObject } from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-getv
 *
 * The abstract operation GetV is used to retrieve the value of a specific property of
 * an ECMAScript language value. If the value is not an object, the property lookup is
 * performed using a wrapper object appropriate for the type of the value.
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(V).
 * 2. Return ? O.[[Get]](P, V).
 * ```
 *
 * @param {*} V An ECMAScript language value.
 * @param {*} P A property key.
 * @returns Either a normal completion containing an ECMAScript language value or a throw completion.
 */
export function GetV(V, P) {
    let O;

    try {
        O = ToObject(V);
    } catch (e) {
        throw new TypeError('Cannot convert to object');
    }

    return O[P];
}
