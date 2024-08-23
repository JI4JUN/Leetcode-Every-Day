import { RequireObjectCoercible } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    ToIntegerOrInfinity,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-string.prototype.at
 *
 * String.prototype.at(index)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? RequireObjectCoercible(this value).
 * 2. Let S be ? ToString(O).
 * 3. Let len be the length of S.
 * 4. Let relativeIndex be ? ToIntegerOrInfinity(index).
 * 5. If relativeIndex ≥ 0, then
 *     a. Let k be relativeIndex.
 * 6. Else,
 *     a. Let k be len + relativeIndex.
 * 7. If k < 0 or k ≥ len, return undefined.
 * 8. Return the substring of S from k to k + 1.
 * ```
 */
export function mockAt(index) {
    const O = RequireObjectCoercible(this);
    const S = ToString(O);
    const len = S.length;
    const relativeIndex = ToIntegerOrInfinity(index);

    let k;

    if (relativeIndex >= 0) {
        k = relativeIndex;
    } else {
        k = len + relativeIndex;
    }

    if (k < 0 && k >= len) {
        return undefined;
    }

    return S[k];
}
