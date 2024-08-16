import { Get, HasProperty } from 'utils/AbstractOperations/OperationsOnObjects';
import {
    ToObject,
    LengthOfArrayLike,
    ToString,
    ToIntegerOrInfinity
} from 'utils/AbstractOperations/TypeConversion';
import { IsStrictlyEqual } from 'utils/AbstractOperations/TestingAndComparsionOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.indexof
 *
 * Array.prototype.indexOf(searchElement [ , fromIndex])
 *
 * ```markdown
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If len = 0, return -1𝔽.
 * 4. Let n be ? ToIntegerOrInfinity(fromIndex).
 * 5. Assert: If fromIndex is undefined, then n is 0.
 * 6. If n = +∞, return -1𝔽.
 * 7. Else if n = -∞, set n to 0.
 * 8. If n ≥ 0, then
 * a. Let k be n.
 * 9. Else,
 *     a. Let k be len + n.
 *     b. If k < 0, set k to 0.
 * 10. Repeat, while k < len,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let elementK be ? Get(O, Pk).
 *         ii. If IsStrictlyEqual(searchElement, elementK) is true, return 𝔽(k).
 *     d. Set k to k + 1.
 * 11. Return -1𝔽.
 * ```
 */
export function tinyIndexOf(searchElement, fromIndex) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (len === 0) {
        return -1;
    }

    let n = ToIntegerOrInfinity(fromIndex);

    if (fromIndex === 0) {
        n = 0;
    }

    if (n === +Infinity) {
        return -1;
    } else if (n === -Infinity) {
        n = 0;
    }

    let k;

    if (n >= 0) {
        k = n;
    } else {
        k = len + n;

        if (k < 0) {
            k = 0;
        }
    }

    while (k < len) {
        const kPresent = HasProperty(O, ToString(k));

        if (kPresent === true) {
            const elementK = Get(O, ToString(k));

            if (IsStrictlyEqual(searchElement, elementK) === true) {
                return k;
            }
        }

        k++;
    }

    return -1;
}
