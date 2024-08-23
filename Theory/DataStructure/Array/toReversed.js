import {
    CreateDataPropertyOrThrow,
    Get
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { F } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.toreversed
 *
 * Array.prototype.toReversed()
 *
 * ```markdown
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let A be ? ArrayCreate(len).
 * 4. Let k be 0.
 * 5. Repeat, while k < len,
 *     a. Let from be ! ToString(𝔽(len - k - 1)).
 *     b. Let Pk be ! ToString(𝔽(k)).
 *     c. Let fromValue be ? Get(O, from).
 *     d. Perform ! CreateDataPropertyOrThrow(A, Pk, fromValue).
 *     e. Set k to k + 1.
 * 6. Return A.
 * ```
 */
export function mockToReversed() {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const A = new Array(len);

    let k = 0;

    while (k < len) {
        const from = ToString(F(len - k - 1));
        const Pk = ToString(F(k));
        const fromValue = Get(O, from);

        CreateDataPropertyOrThrow(A, Pk, fromValue);

        k++;
    }

    return A;
}
