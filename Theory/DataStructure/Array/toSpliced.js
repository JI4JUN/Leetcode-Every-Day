import {
    CreateDataPropertyOrThrow,
    Get
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { F } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.tospliced
 *
 * Array.prototype.toSpliced(start, skipCount, ...items)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let relativeStart be ? ToIntegerOrInfinity(start).
 * 4. If relativeStart = -∞, let actualStart be 0.
 * 5. Else if relativeStart < 0, let actualStart be max(len + relativeStart, 0).
 * 6. Else, let actualStart be min(relativeStart, len).
 * 7. Let insertCount be the number of elements in items.
 * 8. If start is not present, then
 *     a. Let actualSkipCount be 0.
 * 9. Else if skipCount is not present, then
 *     a. Let actualSkipCount be len - actualStart.
 * 10. Else,
 *     a. Let sc be ? ToIntegerOrInfinity(skipCount).
 *     b. Let actualSkipCount be the result of clamping sc between 0 and len - actualStart.
 * 11. Let newLen be len + insertCount - actualSkipCount.
 * 12. If newLen > 2**53 - 1, throw a TypeError exception.
 * 13. Let A be ? ArrayCreate(newLen).
 * 14. Let i be 0.
 * 15. Let r be actualStart + actualSkipCount.
 * 16. Repeat, while i < actualStart,
 *     a. Let Pi be ! ToString(𝔽(i)).
 *     b. Let iValue be ? Get(O, Pi).
 *     c. Perform ! CreateDataPropertyOrThrow(A, Pi, iValue).
 *     d. Set i to i + 1.
 * 17. For each element E of items, do
 *     a. Let Pi be ! ToString(𝔽(i)).
 *     b. Perform ! CreateDataPropertyOrThrow(A, Pi, E).
 *     c. Set i to i + 1.
 * 18. Repeat, while i < newLen,
 *     a. Let Pi be ! ToString(𝔽(i)).
 *     b. Let from be ! ToString(𝔽(r)).
 *     c. Let fromValue be ? Get(O, from).
 *     d. Perform ! CreateDataPropertyOrThrow(A, Pi, fromValue).
 *     e. Set i to i + 1.
 *     f. Set r to r + 1.
 * 19. Return A.
 * ```
 */
export function tinyToSpliced(start, skipCount, ...items) {
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

    const insertCount = items.length;

    let actualSkipCount;

    if (start === undefined) {
        actualSkipCount = 0;
    } else if (skipCount === undefined) {
        actualSkipCount = len - actualStart;
    } else {
        const sc = ToIntegerOrInfinity(skipCount);

        actualSkipCount = Math.min(Math.max(sc, 0), len - actualStart);
    }

    const newLen = len + insertCount - actualSkipCount;

    if (newLen > 2 ** 53 - 1) {
        throw new TypeError('The array length must not exceed 2^53 - 1');
    }

    const A = new Array(newLen);

    let i = 0;
    let r = actualStart + actualSkipCount;

    while (i < actualStart) {
        const Pi = ToString(F(i));
        const iValue = Get(O, Pi);

        CreateDataPropertyOrThrow(A, Pi, iValue);

        i++;
    }

    for (const E of items) {
        const Pi = ToString(F(i));

        CreateDataPropertyOrThrow(A, Pi, E);

        i++;
    }

    while (i < newLen) {
        const Pi = ToString(F(i));
        const from = ToString(F(r));
        const fromValue = Get(O, from);

        CreateDataPropertyOrThrow(A, Pi, fromValue);

        i++;
        r++;
    }

    return A;
}
