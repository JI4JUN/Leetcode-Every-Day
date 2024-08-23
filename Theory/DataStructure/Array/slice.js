import {
    CreateDataPropertyOrThrow,
    HasProperty,
    Set,
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
 * Array.prototype.slice
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let relativeStart be ? ToIntegerOrInfinity(start).
 * 4. If relativeStart = -∞, let k be 0.
 * 5. Else if relativeStart < 0, let k be max(len + relativeStart, 0).
 * 6. Else, let k be min(relativeStart, len).
 * 7. If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToIntegerOrInfinity(end).
 * 8. If relativeEnd = -∞, let final be 0.
 * 9. Else if relativeEnd < 0, let final be max(len + relativeEnd, 0).
 * 10. Else, let final be min(relativeEnd, len).
 * 11. Let count be max(final - k, 0).
 * 12. Let A be ? ArraySpeciesCreate(O, count).
 * 13. Let n be 0.
 * 14. Repeat, while k < final,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Let kPresent be ? HasProperty(O, Pk).
 *     c. If kPresent is true, then
 *         i. Let kValue be ? Get(O, Pk).
 *         ii. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(n)), kValue).
 *     d. Set k to k + 1.
 *     e. Set n to n + 1.
 * 15. Perform ? Set(A, "length", 𝔽(n), true).
 * 16. Return A.
 * ```
 */
export function tinySlice(start, end) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const relativeStart = ToIntegerOrInfinity(start);

    let k;

    if (relativeStart === -Infinity) {
        k = 0;
    } else if (relativeStart < 0) {
        k = Math.max(len + relativeStart, 0);
    } else {
        k = Math.min(relativeStart, len);
    }

    let relativeEnd;

    if (end === undefined) {
        relativeEnd = len;
    } else {
        relativeEnd = ToIntegerOrInfinity(end);
    }

    let final;

    if (relativeEnd === -Infinity) {
        final = 0;
    } else if (relativeEnd < 0) {
        final = Math.max(len + relativeEnd, 0);
    } else {
        final = Math.min(relativeEnd, len);
    }

    let count = Math.max(final - k, 0);

    const A = new Array(count);

    let n = 0;

    while (k < final) {
        const Pk = ToString(F(k));
        const kPresent = HasProperty(O, Pk);

        if (kPresent) {
            const kValue = Get(O, Pk);

            CreateDataPropertyOrThrow(A, ToString(F(n)), kValue);
        }

        k++;
        n++;
    }

    Set(A, 'length', F(n), true);

    return A;
}
