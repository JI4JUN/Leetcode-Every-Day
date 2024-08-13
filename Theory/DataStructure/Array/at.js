import {
    Get,
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from '../utils/AbstractOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.at
 *
 * Array.prototype.at(index)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let relativeIndex be ? ToIntegerOrInfinity(index).
 * 4. If relativeIndex ≥ 0, then
 *     a. Let k be relativeIndex.
 * 5. Else,
 *     a. Let k be len + relativeIndex.
 * 6. If k < 0 or k ≥ len, return undefined.
 * 7. Return ? Get(O, ! ToString(𝔽(k))).
 * ```
 */
export function tinyAt(index) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const relativeIndex = ToIntegerOrInfinity(index);

    let k;

    if (relativeIndex >= 0) {
        k = relativeIndex;
    } else {
        k = len + relativeIndex;
    }

    if (k < 0 || k >= len) {
        return undefined;
    }

    return Get(O, ToString(k));
}
