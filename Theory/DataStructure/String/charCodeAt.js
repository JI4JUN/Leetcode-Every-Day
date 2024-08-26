import { RequireObjectCoercible } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    ToIntegerOrInfinity,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-string.prototype.charcodeat
 *
 * String.prototype.charCodeAt(pos)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? RequireObjectCoercible(this value).
 * 2. Let S be ? ToString(O).
 * 3. Let position be ? ToIntegerOrInfinity(pos).
 * 4. Let size be the length of S.
 * 5. If position < 0 or position ≥ size, return NaN.
 * 6. Return the Number value for the numeric value of the code unit at index position within the String S.
 * ```
 */
export function mockCharCodeAt(pos) {
    const O = RequireObjectCoercible(this);
    const S = ToString(O);
    const position = ToIntegerOrInfinity(pos);
    const size = S.length;

    if (position < 0 || position >= size) {
        return NaN;
    }

    // Note: Currently unable to find a method to obtain code unit without using the String.prototype APIs.
    return S.charCodeAt(position);
}
