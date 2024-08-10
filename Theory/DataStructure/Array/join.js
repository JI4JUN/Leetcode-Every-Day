import {
    Get,
    LengthOfArrayLike,
    ToObject,
    ToString
} from '../utils/AbstractOperations';

/**
 * ```markdown
 * Array.prototype.join(separator)
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If separator is undefined, let sep be ",".
 * 4. Else, let sep be ? ToString(separator).
 * 5. Let R be the empty String.
 * 6. Let k be 0.
 * 7. Repeat, while k < len,
 *     a. If k > 0, set R to the string-concatenation of R and sep.
 *     b. Let element be ? Get(O, ! ToString(𝔽(k))).
 *     c. If element is neither undefined nor null, then
 *         i. Let S be ? ToString(element).
 *         ii. Set R to the string-concatenation of R and S.
 *     d. Set k to k + 1.
 * 8. Return R.
 * ```
 *
 * https://tc39.es/ecma262/#sec-array.prototype.join
 */
export function tinyJoin(separator) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    let sep;

    if (separator === undefined) {
        sep = ',';
    } else {
        sep = ToString(separator);
    }

    let R = '';
    let k = 0;

    while (k < len) {
        if (k > 0) {
            R = R + sep;
        }

        const element = Get(O, k);

        if (element !== undefined && element !== null) {
            const S = ToString(element);

            R = R + S;
        }

        k++;
    }

    return R;
}
