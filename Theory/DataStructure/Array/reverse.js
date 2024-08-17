import {
    DeletePropertyOrThrow,
    Get,
    HasProperty,
    Set
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.reverse
 *
 * Array.prototype.reverse()
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let middle be floor(len / 2).
 * 4. Let lower be 0.
 * 5. Repeat, while lower ≠ middle,
 *     a. Let upper be len - lower - 1.
 *     b. Let upperP be ! ToString(𝔽(upper)).
 *     c. Let lowerP be ! ToString(𝔽(lower)).
 *     d. Let lowerExists be ? HasProperty(O, lowerP).
 *     e. If lowerExists is true, then
 *         i. Let lowerValue be ? Get(O, lowerP).
 *     f. Let upperExists be ? HasProperty(O, upperP).
 *     g. If upperExists is true, then
 *         i. Let upperValue be ? Get(O, upperP).
 *     h. If lowerExists is true and upperExists is true, then
 *         i. Perform ? Set(O, lowerP, upperValue, true).
 *         ii. Perform ? Set(O, upperP, lowerValue, true).
 *     i. Else if lowerExists is false and upperExists is true, then
 *         i. Perform ? Set(O, lowerP, upperValue, true).
 *         ii. Perform ? DeletePropertyOrThrow(O, upperP).
 *     j. Else if lowerExists is true and upperExists is false, then
 *         i. Perform ? DeletePropertyOrThrow(O, lowerP).
 *         ii. Perform ? Set(O, upperP, lowerValue, true).
 *     k. Else,
 *         i. Assert: lowerExists and upperExists are both false.
 *         ii. NOTE: No action is required.
 *     l. Set lower to lower + 1.
 * 6. Return O.
 * ```
 */
export function tinyReverse() {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const middle = Math.floor(len / 2);

    let lower = 0;

    while (lower !== middle) {
        const upper = len - lower - 1;
        const upperP = ToString(upper);
        const lowerP = ToString(lower);
        const lowerExists = HasProperty(O, lowerP);

        let lowerValue;

        if (lowerExists) {
            lowerValue = Get(O, lowerP);
        }

        const upperExists = HasProperty(O, upperP);

        let upperValue;

        if (upperExists) {
            upperValue = Get(O, upperP);
        }

        if (lowerExists && upperExists) {
            Set(O, lowerP, upperValue, true);
            Set(O, upperP, lowerValue, true);
        } else if (!lowerExists && upperExists) {
            Set(O, lowerP, upperValue, true);
            DeletePropertyOrThrow(O, upperP);
        } else if (lowerExists && !upperExists) {
            DeletePropertyOrThrow(O, lowerP);
            Set(O, upperP, lowerValue, true);
        } else {
            continue;
        }

        lower++;
    }

    return O;
}
