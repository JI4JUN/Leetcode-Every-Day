import {
    CreateDataPropertyOrThrow,
    Get
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.with
 *
 * Array.prototype.with(index, value)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let relativeIndex be ? ToIntegerOrInfinity(index).
 * 4. If relativeIndex ≥ 0, let actualIndex be relativeIndex.
 * 5. Else, let actualIndex be len + relativeIndex.
 * 6. If actualIndex ≥ len or actualIndex < 0, throw a RangeError exception.
 * 7. Let A be ? ArrayCreate(len).
 * 8. Let k be 0.
 * 9. Repeat, while k < len,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. If k = actualIndex, let fromValue be value.
 *     c. Else, let fromValue be ? Get(O, Pk).
 *     d. Perform ! CreateDataPropertyOrThrow(A, Pk, fromValue).
 *     e. Set k to k + 1.
 * 10. Return A.
 * ```
 */
export function tinyWith(index, value) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const relativeIndex = ToIntegerOrInfinity(index);

    let actualIndex;

    if (relativeIndex >= 0) {
        actualIndex = relativeIndex;
    } else {
        actualIndex = len + relativeIndex;
    }

    if (actualIndex > len || actualIndex < 0) {
        throw new RangeError('Index out of range');
    }

    const A = new Array(len);

    let k = 0;

    while (k < len) {
        const Pk = ToString(k);

        let fromValue;

        if (k === actualIndex) {
            fromValue = value;
        } else {
            fromValue = Get(O, Pk);
        }

        CreateDataPropertyOrThrow(A, Pk, fromValue);

        k++;
    }

    return A;
}
