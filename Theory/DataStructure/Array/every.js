import {
    Call,
    Get,
    HasProperty,
    IsCallable,
    LengthOfArrayLike,
    ToBoolean,
    ToObject,
    ToString
} from '../utils/AbstractOperations/index';

/**
 * Array.prototype.every(callbackfn [, thisArg])
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
 * 4. Let k be 0.
 * 5. Repeat, while k < len,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let kValue be ? Get(O, Pk).
 *         ii. Let testResult be ToBoolean(? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »)).
 *         iii. If testResult is false, return false.
 *     d. Set k to k + 1.
 * 6. Return true.
 *
 * https://tc39.es/ecma262/#sec-array.prototype.every
 */
export function tinyEvery(callbackfn, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (IsCallable(callbackfn) === false) {
        throw new TypeError(
            `${typeof callbackfn} ${
                Object.is(callbackfn, undefined) ? '' : callbackfn
            } is not a function`
        );
    }

    let k = 0;

    while (k < len) {
        const Pk = ToString(k);
        const kPresent = HasProperty(O, Pk);

        if (kPresent === true) {
            const kValue = Get(O, Pk);
            const testResult = ToBoolean(
                Call(callbackfn, thisArg, [kValue, k, O])
            );

            if (testResult === false) {
                return false;
            }
        }

        k++;
    }

    return true;
}
