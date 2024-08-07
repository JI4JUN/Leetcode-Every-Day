import {
    Get,
    LengthOfArrayLike,
    SameValueZero,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from '../utils/AbstractOperations';

/**
 * ```markdown
 * Array.prototype.includes(searchElement [, fromIndex])
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If len = 0, return false.
 * 4. Let n be ? ToIntegerOrInfinity(fromIndex).
 * 5. Assert: If fromIndex is undefined, then n is 0.
 * 6. If n = +∞, return false.
 * 7. Else if n = -∞, set n to 0.
 * 8. If n ≥ 0, then
 *     a. Let k be n.
 * 9. Else,
 *     a. Let k be len + n.
 *     b. If k < 0, set k to 0.
 * 10. Repeat, while k < len,
 *     a. Let elementK be ? Get(O, ! ToString(𝔽(k))).
 *     b. If SameValueZero(searchElement, elementK) is true, return true.
 *     c. Set k to k + 1.
 * 11. Return false.
 *
 * ```
 * https://tc39.es/ecma262/#sec-array.prototype.includes
 */
export function tinyIncludes(searchElement, fromIndex) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (len === 0) {
        return false;
    }

    let n = ToIntegerOrInfinity(fromIndex);

    if (fromIndex === undefined) {
        n = 0;
    }

    if (n === +Infinity) {
        return false;
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
        const elementK = Get(O, ToString(k));

        if (SameValueZero(searchElement, elementK) === true) {
            return true;
        }

        k++;
    }

    return false;
}
