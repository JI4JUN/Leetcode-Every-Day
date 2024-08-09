import {
    Get,
    Set,
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    ToString,
    HasProperty,
    DeletePropertyOrThrow
} from '../utils/AbstractOperations';

/**
 * ```Markdown
 * Array.prototype.copyWithin(target, start [, end])
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let relativeTarget be ? ToIntegerOrInfinity(target).
 * 4. If relativeTarget = -∞, let to be 0.
 * 5. Else if relativeTarget < 0, let to be max(len + relativeTarget, 0).
 * 6. Else, let to be min(relativeTarget, len).
 * 7. Let relativeStart be ? ToIntegerOrInfinity(start).
 * 8. If relativeStart = -∞, let from be 0.
 * 9. Else if relativeStart < 0, let from be max(len + relativeStart, 0).
 * 10. Else, let from be min(relativeStart, len).
 * 11. If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToIntegerOrInfinity(end).
 * 12. If relativeEnd = -∞, let final be 0.
 * 13. Else if relativeEnd < 0, let final be max(len + relativeEnd, 0).
 * 14. Else, let final be min(relativeEnd, len).
 * 15. Let count be min(final - from, len - to).
 * 16. If from < to and to < from + count, then
 *     a. Let direction be -1.
 *     b. Set from to from + count - 1.
 *     c. Set to to to + count - 1.
 * 17. Else,
 *     a. Let direction be 1.
 * 18. Repeat, while count > 0,
 *     a. Let fromKey be ! ToString(𝔽(from)).
 *     b. Let toKey be ! ToString(𝔽(to)).
 *     c. Let fromPresent be ? HasProperty(O, fromKey).
 *     d. If fromPresent is true, then
 *         i. Let fromValue be ? Get(O, fromKey).
 *         ii. Perform ? Set(O, toKey, fromValue, true).
 *     e. Else,
 *         i. Assert: fromPresent is false.
 *         ii. Perform ? DeletePropertyOrThrow(O, toKey).
 *     f. Set from to from + direction.
 *     g. Set to to to + direction.
 *     h. Set count to count - 1.
 * 19. Return O.
 * ```
 *
 * https://tc39.es/ecma262/#sec-array.prototype.copywithin
 */
export function tinyCopyWithin(target, start, end) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const relativeTarget = ToIntegerOrInfinity(target);
    const relativeStart = ToIntegerOrInfinity(start);

    let to;

    if (relativeTarget === -Infinity) {
        to = 0;
    } else if (relativeTarget < 0) {
        to = Math.max(len + relativeTarget, 0);
    } else {
        to = Math.min(relativeTarget, len);
    }

    let from;

    if (relativeStart === -Infinity) {
        from = 0;
    } else if (relativeStart < 0) {
        from = Math.max(len + relativeStart, 0);
    } else {
        from = Math.min(relativeStart, len);
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

    let count = Math.min(final - from, len - to);
    let direction;

    if (from < to && to < from + count) {
        direction = -1;
        from = from + count - 1;
        to = to + count - 1;
    } else {
        direction = 1;
    }

    while (count > 0) {
        const fromKey = ToString(from);
        const toKey = ToString(to);
        const fromProperty = HasProperty(O, fromKey);

        if (fromProperty === true) {
            const fromValue = Get(O, fromKey);

            Set(O, toKey, fromValue, true);
        } else {
            DeletePropertyOrThrow(O, toKey);
        }

        from += direction;
        to += direction;
        count--;
    }

    return O;
}
