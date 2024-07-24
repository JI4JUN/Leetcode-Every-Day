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

const {
    ToObject,
    LengthOfArrayLike,
    IsCallable,
    ToString,
    HasProperty,
    Get,
    Call,
    F
} = require('../utils/AbstractOperations/utils.js');

Array.prototype.tinyForEach = function (callbackfn, thisArg) {
    // 1. Let O be ? ToObject(this value).
    const O = ToObject(this);

    // 2. Let len be ? LengthOfArrayLike(O).
    const len = LengthOfArrayLike(O);

    // 3. If IsCallable(callbackfn) is false, throw a TypeError exception.
    if (IsCallable(callbackfn) === false) {
        throw TypeError(
            `${typeof callbackfn} ${
                Object.is(callbackfn, undefined) ? '' : callbackfn
            } is not a function`
        );
    }

    // 4. Let k be 0.
    let k = 0;

    // 5. Repeat, while k < len.
    while (k < len) {
        // a. Let Pk be ! ToString(𝔽(k)).
        const Pk = ToString(k);

        // b. Let kPresent be ? HasProperty(O, Pk).
        const kPresent = HasProperty(O, Pk);

        // c. If kPresent is true, then
        if (kPresent === true) {
            // i. Let kValue be ? Get(O, Pk).
            const kValue = Get(O, Pk);

            // ii. Perform ? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »).
            Call(callbackfn, thisArg, [kValue, F(k), O]);
        }

        // d. Set k to k + 1.
        k++;
    }

    // 6. Return undefined.
    return undefined;
};

module.exports = Array;
