import {
    Call,
    Get,
    HasProperty,
    IsCallable,
    ToObject,
    ToString,
    LengthOfArrayLike
} from '../utils/AbstractOperations';

/**
 * Array.prototype.forEach(callbackfn [, thisArg])
 *
 * Steps:
 *
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
 * 4. Let k be 0.
 * 5. Repeat, while k < len,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let kValue be ? Get(O, Pk).
 *         ii. Perform ? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »).
 *     d. Set k to k + 1.
 * 6. Return undefined.
 *
 * https://tc39.es/ecma262/#sec-array.prototype.foreach
 */
export function tinyforEach(callbackfn, thisArg) {
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

            Call(callbackfn, thisArg, [kValue, k, O]);
        }

        k++;
    }

    return undefined;
}
