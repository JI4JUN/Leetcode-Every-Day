import { RequireObjectCoercible } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import { ToString } from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-string.prototype.concat
 *
 * String.prototype.concat(...args)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? RequireObjectCoercible(this value).
 * 2. Let S be ? ToString(O).
 * 3. Let R be S.
 * 4. For each element next of args, do
 *     a. Let nextString be ? ToString(next).
 *     b. Set R to the string-concatenation of R and nextString.
 * 5. Return R.
 * ```
 */
export function mockConcat(...args) {
    const O = RequireObjectCoercible(this);
    const S = ToString(O);

    let R = S;

    for (const next of args) {
        const nextString = ToString(next);
        R += nextString;
    }

    return R;
}
