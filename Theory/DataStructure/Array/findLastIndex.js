import {
    Call,
    Get,
    IsCallable,
    ToBoolean,
    ToObject,
    LengthOfArrayLike,
    ToString
} from '../utils/AbstractOperations';
import { tinyPush } from './push';

Array.prototype.tinyPush = tinyPush;

/**
 * Array.prototype.findLastIndex(predicate [, thisArg])
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let findRec be ? FindViaPredicate(O, len, DESCENDING, predicate, thisArg).
 * 4. Return findRec.[[Index]].
 *
 * https://tc39.es/ecma262/#sec-array.prototype.findlastindex
 */
export function tinyFindLastIndex(predicate, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const findRec = FindViaPredicate(O, len, 'DESCENDING', predicate, thisArg);

    return findRec.index;
}

/**
 * The abstract operation FindViaPredicate is used to find elements in an array that satisfy a certain condition.
 *
 * Steps:
 * 1.If IsCallable(predicate) is false, throw a TypeError exception.
 * 2. If direction is ASCENDING, then
 *     a. Let indices be a List of the integers in the interval from 0 (inclusive) to len (exclusive), in ascending order.
 * 3. Else,
 *     a. Let indices be a List of the integers in the interval from 0 (inclusive) to len (exclusive), in descending order.
 * 4. For each integer k of indices, do
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. NOTE: If O is a TypedArray, the following invocation of Get will return a normal completion.
 *     c. Let kValue be ? Get(O, Pk).
 *     d. Let testResult be ? Call(predicate, thisArg, « kValue, 𝔽(k), O »).
 *     e. If ToBoolean(testResult) is true, return the Record { [[Index]]: 𝔽(k), [[Value]]: kValue }.
 * 5. Return the Record { [[Index]]: -1𝔽, [[Value]]: undefined }.
 *
 * @param {*} O An array-like object or a TypedArray
 * @param {*} len A non-negative integer
 * @param {*} direction ’ASCENDING‘ or ’DESCENDING‘
 * @param {*} predicate A function
 * @param {*} thisArg this value for each invocation of predicate
 * @returns Either a normal completion containing a Record with fields [[Index]] (an integral Number) and [[Value]] (an ECMAScript language value) or a throw completion.
 */
export function FindViaPredicate(O, len, direction, predicate, thisArg) {
    if (IsCallable(predicate) === false) {
        throw new TypeError(
            `${typeof predicate} ${
                Object.is(predicate, undefined) ? '' : predicate
            } is not a function`
        );
    }

    // TODO: Need to implement my own Array.from() function in the future.
    let indices =
        direction === 'ASCENDING'
            ? Array.from({ length: len }, (_, i) => i)
            : Array.from({ length: len }, (_, i) => len - 1 - i);

    for (const k of indices) {
        const Pk = ToString(k);
        const kValue = Get(O, Pk);
        const testResult = Call(predicate, thisArg, [kValue, k, O]);

        if (ToBoolean(testResult) === true) {
            return { index: k, value: kValue };
        }
    }

    return { index: -1, value: undefined };
}
