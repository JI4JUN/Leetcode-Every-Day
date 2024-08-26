import { RequireObjectCoercible } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    ToIntegerOrInfinity,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { CodePointAt } from 'utils/ECMAScriptLanguageSourceText/SourceText';
import { F } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-string.prototype.codepointat
 *
 * String.prototype.codePointAt(pos)
 *
 * ```markdown
 * 1. Let O be ? RequireObjectCoercible(this value).
 * 2. Let S be ? ToString(O).
 * 3. Let position be ? ToIntegerOrInfinity(pos).
 * 4. Let size be the length of S.
 * 5. If position < 0 or position ≥ size, return undefined.
 * 6. Let cp be CodePointAt(S, position).
 * 7. Return 𝔽(cp.[[CodePoint]]).
 * ```
 */
export function mockCodePointAt(pos) {
    const O = RequireObjectCoercible(this);
    const S = ToString(O);
    const position = ToIntegerOrInfinity(pos);
    const size = S.length;

    if (position < 0 || position >= size) {
        return undefined;
    }

    const cp = CodePointAt(S, position);

    return F(cp.CodePoint);
}
