import {
    Call,
    Get,
    HasProperty
} from 'utils/AbstractOperations/OperationsOnObjects';
import { IsCallable } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    LengthOfArrayLike,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.reduceright
 *
 * Array.prototype.reduceRight(callback [ , initialValue])
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If IsCallable(callback) is false, throw a TypeError exception.
 * 4. If len = 0 and initialValue is not present, throw a TypeError exception.
 * 5. Let k be len - 1.
 * 6. Let accumulator be undefined.
 * 7. If initialValue is present, then
 *     a. Set accumulator to initialValue.
 * 8. Else,
 *     a. Let kPresent be false.
 *     b. Repeat, while kPresent is false and k ≥ 0,
 *         i. Let Pk be ! ToString(𝔽(k)).
 *         ii. Set kPresent to ? HasProperty(O, Pk).
 *         iii. If kPresent is true, then
 *             1. Set accumulator to ? Get(O, Pk).
 *         iv. Set k to k - 1.
 *     c. If kPresent is false, throw a TypeError exception.
 * 9. Repeat, while k ≥ 0,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let kValue be ? Get(O, Pk).
 *         ii. Set accumulator to ? Call(callback, undefined, « accumulator, kValue, 𝔽(k), O »).
 *     d. Set k to k - 1.
 * 10. Return accumulator.
 * ```
 */
export function tinyReduceRight(callback, initialValue) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (IsCallable(callback) === false) {
        throw new TypeError(
            `${typeof callback} ${
                Object.is(callback, undefined) ? '' : callback
            } is not a function`
        );
    }

    if (len === 0 && initialValue === undefined) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let k = len - 1;
    let accumulator = undefined;

    if (initialValue !== undefined) {
        accumulator = initialValue;
    } else {
        let kPresent = false;

        while (kPresent === false && k >= 0) {
            const Pk = ToString(k);
            kPresent = HasProperty(O, Pk);

            if (kPresent === true) {
                accumulator = Get(O, Pk);
            }

            k--;
        }
    }

    while (k >= 0) {
        const Pk = ToString(k);
        const kPresent = HasProperty(O, Pk);

        if (kPresent) {
            const kValue = Get(O, Pk);
            accumulator = Call(callback, undefined, [
                accumulator,
                kValue,
                k,
                O
            ]);
        }

        k--;
    }

    return accumulator;
}
