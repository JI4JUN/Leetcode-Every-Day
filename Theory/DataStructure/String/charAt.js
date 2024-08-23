import { RequireObjectCoercible } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    ToIntegerOrInfinity,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-string.prototype.charat
 *
 * String.prototype.charAt(pos)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? RequireObjectCoercible(this value).
 * 2. Let S be ? ToString(O).
 * 3. Let position be ? ToIntegerOrInfinity(pos).
 * 4. Let size be the length of S.
 * 5. If position < 0 or position ≥ size, return the empty String.
 * 6. Return the substring of S from position to position + 1.
 * ```
 */
export function mockCharAt(pos) {
    const O = RequireObjectCoercible(this);
    const S = ToString(O);
    const position = ToIntegerOrInfinity(pos);
    const size = S.length;

    if (position < 0 || position >= size) {
        return '';
    }

    return S[position];
}
