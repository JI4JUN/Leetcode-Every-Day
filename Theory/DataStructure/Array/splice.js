import {
    CreateDataPropertyOrThrow,
    DeletePropertyOrThrow,
    Get,
    HasProperty,
    Set
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { F } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.splice
 *
 * Array.prototype.splice(start, deleteCount, ...items)
 *
 * ```markdown
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let relativeStart be ? ToIntegerOrInfinity(start).
 * 4. If relativeStart = -∞, let actualStart be 0.
 * 5. Else if relativeStart < 0, let actualStart be max(len + relativeStart, 0).
 * 6. Else, let actualStart be min(relativeStart, len).
 * 7. Let itemCount be the number of elements in items.
 * 8. If start is not present, then
 * a. Let actualDeleteCount be 0.
 * 9. Else if deleteCount is not present, then
 *     a. Let actualDeleteCount be len - actualStart.
 * 10. Else,
 *     a. Let dc be ? ToIntegerOrInfinity(deleteCount).
 *     b. Let actualDeleteCount be the result of clamping dc between 0 and len - actualStart.
 * 11. If len + itemCount - actualDeleteCount > 2**53 - 1, throw a TypeError exception.
 * 12. Let A be ? ArraySpeciesCreate(O, actualDeleteCount).
 * 13. Let k be 0.
 * 14. Repeat, while k < actualDeleteCount,
 *     a. Let from be ! ToString(𝔽(actualStart + k)).
 *     b. If ? HasProperty(O, from) is true, then
 *         i. Let fromValue be ? Get(O, from).
 *         ii. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(k)), fromValue).
 *     c. Set k to k + 1.
 * 15. Perform ? Set(A, "length", 𝔽(actualDeleteCount), true).
 * 16. If itemCount < actualDeleteCount, then
 *     a. Set k to actualStart.
 *     b. Repeat, while k < (len - actualDeleteCount),
 *         i. Let from be ! ToString(𝔽(k + actualDeleteCount)).
 *         ii. Let to be ! ToString(𝔽(k + itemCount)).
 *         iii. If ? HasProperty(O, from) is true, then
 *             1. Let fromValue be ? Get(O, from).
 *             2. Perform ? Set(O, to, fromValue, true).
 *         iv. Else,
 *             1. Perform ? DeletePropertyOrThrow(O, to).
 *         v. Set k to k + 1.
 *     c. Set k to len.
 *     d. Repeat, while k > (len - actualDeleteCount + itemCount),
 *         i. Perform ? DeletePropertyOrThrow(O, ! ToString(𝔽(k - 1))).
 *         ii. Set k to k - 1.
 * 17. Else if itemCount > actualDeleteCount, then
 *     a. Set k to (len - actualDeleteCount).
 *     b. Repeat, while k > actualStart,
 *         i. Let from be ! ToString(𝔽(k + actualDeleteCount - 1)).
 *         ii. Let to be ! ToString(𝔽(k + itemCount - 1)).
 *         iii. If ? HasProperty(O, from) is true, then
 *             1. Let fromValue be ? Get(O, from).
 *             2. Perform ? Set(O, to, fromValue, true).
 *         iv. Else,
 *             1. Perform ? DeletePropertyOrThrow(O, to).
 *         v. Set k to k - 1.
 * 18. Set k to actualStart.
 * 19. For each element E of items, do
 *     a. Perform ? Set(O, ! ToString(𝔽(k)), E, true).
 *     b. Set k to k + 1.
 * 20. Perform ? Set(O, "length", 𝔽(len - actualDeleteCount + itemCount), true).
 * 21. Return A.
 * ```
 */
export function tinySplice(start, deleteCount, ...items) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const relativeStart = ToIntegerOrInfinity(start);

    let actualStart;

    if (relativeStart === -Infinity) {
        actualStart = 0;
    } else if (relativeStart < 0) {
        actualStart = Math.max(len + relativeStart, 0);
    } else {
        actualStart = Math.min(relativeStart, len);
    }

    const itemCount = items.length;

    let actualDeleteCount;

    if (start === undefined) {
        actualDeleteCount = 0;
    } else if (deleteCount === undefined) {
        actualDeleteCount = len - actualStart;
    } else {
        const dc = ToIntegerOrInfinity(deleteCount);

        actualDeleteCount = Math.min(Math.max(dc, 0), len - actualStart);
    }

    if (len + itemCount - actualDeleteCount > 2 ** 53 - 1) {
        throw new TypeError('Maximum allowed length exceeded');
    }

    const A = new Array(actualDeleteCount);

    let k = 0;

    while (k < actualDeleteCount) {
        const from = ToString(F(actualStart + k));

        if (HasProperty(O, from)) {
            const fromValue = Get(O, from);

            CreateDataPropertyOrThrow(A, ToString(F(k)), fromValue);
        }

        k++;
    }

    Set(A, 'length', actualDeleteCount, true);

    if (itemCount < actualDeleteCount) {
        k = actualStart;

        while (k < len - actualDeleteCount) {
            const from = ToString(F(k + actualDeleteCount));
            const to = ToString(F(k + itemCount));

            if (HasProperty(O, from)) {
                const fromValue = Get(O, from);

                Set(O, to, fromValue, true);
            } else {
                DeletePropertyOrThrow(O, to);
            }

            k++;
        }

        k = len;

        while (k > len - actualDeleteCount + itemCount) {
            DeletePropertyOrThrow(O, ToString(F(k - 1)));

            k--;
        }
    } else if (itemCount > actualDeleteCount) {
        k = len - actualDeleteCount;

        while (k > actualStart) {
            const from = ToString(F(k + actualDeleteCount - 1));
            const to = ToString(F(k + itemCount - 1));

            if (HasProperty(O, from)) {
                const fromValue = Get(O, from);

                Set(O, to, fromValue, true);
            } else {
                DeletePropertyOrThrow(O, to);
            }

            k--;
        }
    }

    k = actualStart;

    for (const E of items) {
        Set(O, ToString(F(k)), E, true);

        k++;
    }

    Set(O, 'length', F(len - actualDeleteCount + itemCount), true);

    return A;
}
