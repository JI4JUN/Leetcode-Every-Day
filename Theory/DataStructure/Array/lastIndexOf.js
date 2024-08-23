import { Get, HasProperty } from 'utils/AbstractOperations/OperationsOnObjects';
import { IsStrictlyEqual } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { F } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.lastindexof
 *
 * Array.prototype.lastIndexOf(searchElement [ , fromIndex])
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If len = 0, return -1𝔽.
 * 4. If fromIndex is present, let n be ? ToIntegerOrInfinity(fromIndex); else let n be len - 1.
 * 5. If n = -∞, return -1𝔽.
 * 6. If n ≥ 0, then
 *     a. Let k be min(n, len - 1).
 * 7. Else,
 *     a. Let k be len + n.
 * 8. Repeat, while k ≥ 0,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let elementK be ? Get(O, Pk).
 *         ii. If IsStrictlyEqual(searchElement, elementK) is true, return 𝔽(k).
 *     d. Set k to k - 1.
 * 9. Return -1𝔽.
 * ```
 */
export function mockLastIndexOf(searchElement, fromIndex) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (len === 0) {
        return -1;
    }

    let n = fromIndex !== undefined ? ToIntegerOrInfinity(fromIndex) : len - 1;

    if (n === -Infinity) {
        return -1;
    }

    let k = n >= 0 ? Math.min(n, len - 1) : len + n;

    while (k >= 0) {
        const Pk = ToString(F(k));
        const kPresent = HasProperty(O, Pk);

        if (kPresent) {
            const elementK = Get(O, Pk);

            if (IsStrictlyEqual(searchElement, elementK)) {
                return k;
            }
        }

        k--;
    }

    return -1;
}
