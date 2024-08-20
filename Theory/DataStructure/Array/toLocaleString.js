import { Invoke, Get } from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.tolocalestring
 *
 * Array.prototype.toLocaleString([reserved1 [ , reserved2]])
 *
 * ```markdown
 * Steps:
 * 1. Let array be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(array).
 * 3. Let separator be the implementation-defined list-separator String value appropriate for the host environment's current locale (such as ", ").
 * 4. Let R be the empty String.
 * 5. Let k be 0.
 * 6. Repeat, while k < len,
 *     a. If k > 0, set R to the string-concatenation of R and separator.
 *     b. Let element be ? Get(array, ! ToString(𝔽(k))).
 *     c. If element is neither undefined nor null, then
 *         i. Let S be ? ToString(? Invoke(element, "toLocaleString")).
 *         ii. Set R to the string-concatenation of R and S.
 *     d. Set k to k + 1.
 * 7. Return R.
 * ```
 */
export function tinyToLocaleString(reserved1, reserved2) {
    const array = ToObject(this);
    const len = LengthOfArrayLike(array);
    const separator = ',';

    let R = '';
    let k = 0;

    while (k < len) {
        if (k > 0) {
            R += separator;
        }

        const element = Get(array, ToString(k));

        if (element !== undefined && element !== null) {
            const S = ToString(
                Invoke(element, 'toLocaleString', [reserved1, reserved2])
            );
            R += S;
        }

        k++;
    }

    return R;
}
