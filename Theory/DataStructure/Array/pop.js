import {
    Get,
    Set,
    DeletePropertyOrThrow
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    ToObject,
    LengthOfArrayLike,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { Assert } from 'utils/Assert';
import { F } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.pop
 *
 * Array.prototype.pop()
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. If len = 0, then
 *     a. Perform ? Set(O, "length", +0𝔽, true).
 *     b. Return undefined.
 * 4. Else,
 *     a. Assert: len > 0.
 *     b. Let newLen be 𝔽(len - 1).
 *     c. Let index be ! ToString(newLen).
 *     d. Let element be ? Get(O, index).
 *     e. Perform ? DeletePropertyOrThrow(O, index).
 *     f. Perform ? Set(O, "length", newLen, true).
 *     g. Return element.
 * ```
 */
export function mockPop() {
    const O = ToObject(this);

    let len = LengthOfArrayLike(O);

    if (len === 0) {
        Set(O, 'length', +0, true);

        return undefined;
    } else {
        Assert(len > 0);

        const newLen = F(len - 1);
        const index = ToString(newLen);
        const element = Get(O, index);

        DeletePropertyOrThrow(O, index);

        Set(O, 'length', newLen, true);

        return element;
    }
}
