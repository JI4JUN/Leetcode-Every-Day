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
 * https://tc39.es/ecma262/#sec-array.prototype.unshift
 *
 * Array.prototype.unshift(...items)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let argCount be the number of elements in items.
 * 4. If argCount > 0, then
 *     a. If len + argCount > 2**53 - 1, throw a TypeError exception.
 *     b. Let k be len.
 *     c. Repeat, while k > 0,
 *         i. Let from be ! ToString(𝔽(k - 1)).
 *         ii. Let to be ! ToString(𝔽(k + argCount - 1)).
 *         iii. Let fromPresent be ? HasProperty(O, from).
 *         iv. If fromPresent is true, then
 *             1. Let fromValue be ? Get(O, from).
 *             2. Perform ? Set(O, to, fromValue, true).
 *         v. Else,
 *             1. Assert: fromPresent is false.
 *             2. Perform ? DeletePropertyOrThrow(O, to).
 *         vi. Set k to k - 1.
 *     d. Let j be +0𝔽.
 *     e. For each element E of items, do
 *         i. Perform ? Set(O, ! ToString(j), E, true).
 *         ii. Set j to j + 1𝔽.
 * 5. Perform ? Set(O, "length", 𝔽(len + argCount), true).
 * 6. Return 𝔽(len + argCount).
 * ```
 */
export function tinyUnshift(...items) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const argCount = items.length;

    if (argCount > 0) {
        if (len + argCount > 2 ** 53 - 1) {
            throw new TypeError('The array length must not exceed 2^53 - 1');
        }

        let k = len;

        while (k > 0) {
            const from = ToString(k - 1);
            const to = ToString(k + argCount - 1);
            const fromPresent = HasProperty(O, from);

            if (fromPresent) {
                const fromValue = Get(O, from);

                Set(O, to, fromValue, true);
            } else {
                DeletePropertyOrThrow(O, to);
            }

            k--;
        }

        let j = +0;

        for (const E of items) {
            Set(O, ToString(j), E, true);

            j++;
        }

        Set(O, 'length', len + argCount, true);

        return len + argCount;
    }
}
