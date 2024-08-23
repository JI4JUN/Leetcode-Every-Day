import {
    Call,
    Get,
    HasProperty
} from 'utils/AbstractOperations/OperationsOnObjects';
import { IsCallable } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    LengthOfArrayLike,
    ToBoolean,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { F } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * Array.prototype.some(callback [ , thisArg ])
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If IsCallable(callback) is false, throw a TypeError exception.
 * 4. Let k be 0.
 * 5. Repeat, while k < len,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let kValue be ? Get(O, Pk).
 *         ii. Let testResult be ToBoolean(? Call(callback, thisArg, « kValue, 𝔽(k), O »)).
 *         iii. If testResult is true, return true.
 *     d. Set k to k + 1.
 * 6. Return false.
 * ```
 */
export function mockSome(callback, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (IsCallable(callback) === false) {
        throw new TypeError(
            `${typeof callback} ${
                Object.is(callback, undefined) ? '' : callback
            } is not a function`
        );
    }

    let k = 0;

    while (k < len) {
        const Pk = ToString(F(k));
        const kPresent = HasProperty(O, Pk);

        if (kPresent) {
            const kValue = Get(O, Pk);
            const testResult = ToBoolean(
                Call(callback, thisArg, [kValue, F(k), O])
            );

            if (testResult) {
                return true;
            }
        }

        k++;
    }

    return false;
}
