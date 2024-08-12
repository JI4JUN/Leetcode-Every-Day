import {
    Call,
    CreateDataPropertyOrThrow,
    Get,
    IsCallable,
    LengthOfArrayLike,
    ToBoolean,
    ToObject,
    ToString,
    HasProperty
} from '../utils/AbstractOperations';

/**
 * Array.prototype.filter(callbackfn [, thisArg])
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
 * 4. Let A be ? ArraySpeciesCreate(O, 0).
 * 5. Let k be 0.
 * 6. Let to be 0.
 * 7. Repeat, while k < len,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let kValue be ? Get(O, Pk).
 *         ii. Let selected be ToBoolean(? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »)).
 *         iii. If selected is true, then
 *             1. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(to)), kValue).
 *             2. Set to to to + 1.
 *     d. Set k to k + 1.
 * 8. Return A.
 * ```
 *
 * https://tc39.es/ecma262/#sec-array.prototype.filter
 */
export function tinyFilter(callbackfn, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (IsCallable(callbackfn) === false) {
        throw new TypeError(
            `${typeof callbackfn} ${
                Object.is(callbackfn, undefined) ? '' : callbackfn
            } is not a function`
        );
    }

    const A = new Array();

    let k = 0;
    let to = 0;

    while (k < len) {
        const Pk = ToString(k);
        const kPresent = HasProperty(O, Pk);

        if (kPresent === true) {
            const kValue = Get(O, Pk);

            const selected = ToBoolean(
                Call(callbackfn, thisArg, [kValue, k, O])
            );

            if (selected === true) {
                CreateDataPropertyOrThrow(A, ToString(to), kValue);

                to++;
            }
        }

        k++;
    }

    return A;
}
