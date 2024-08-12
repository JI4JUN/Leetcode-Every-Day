import {
    LengthOfArrayLike,
    Set,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from '../utils/AbstractOperations';

/**
 * Array.prototype.fill(value [, start [, end]])
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
 * 11. Repeat, while k < final,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. Perform ? Set(O, Pk, value, true).
 *     c. Set k to k + 1.
 * 12. Return O.
 * ```
 *
 * https://tc39.es/ecma262/#sec-array.prototype.fill
 */
export function tinyFill(value, start, end) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const relativeStart = ToIntegerOrInfinity(start);

    let k;

    if (relativeStart < -Infinity) {
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

    while (k < final) {
        const Pk = ToString(k);

        Set(O, Pk, value, true);

        k++;
    }

    return O;
}
