import { IsCallable } from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    LengthOfArrayLike,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { CompareArrayElements, SortIndexedProperties } from './sort';
import { CreateDataPropertyOrThrow } from 'utils/AbstractOperations/OperationsOnObjects';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.tosorted
 *
 * Array.prototype.toSorted(comparator)
 *
 * ```markdown
 * 1. If comparator is not undefined and IsCallable(comparator) is false, throw a TypeError exception.
 * 2. Let O be ? ToObject(this value).
 * 3. Let len be ? LengthOfArrayLike(O).
 * 4. Let A be ? ArrayCreate(len).
 * 5. Let SortCompare be a new Abstract Closure with parameters (x, y) that captures comparator and performs the following steps when called:
 *     a. Return ? CompareArrayElements(x, y, comparator).
 * 6. Let sortedList be ? SortIndexedProperties(O, len, SortCompare, read-through-holes).
 * 7. Let j be 0.
 * 8. Repeat, while j < len,
 *     a. Perform ! CreateDataPropertyOrThrow(A, ! ToString(𝔽(j)), sortedList[j]).
 *     b. Set j to j + 1.
 * 9. Return A.
 * ```
 */
export function tinyToSorted(comparator) {
    if (comparator !== undefined && IsCallable(comparator) === false) {
        throw new TypeError('Invalid comparator');
    }

    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const A = new Array(len);
    const SortCompare = (x, y) => CompareArrayElements(x, y, comparator);
    const sortedList = SortIndexedProperties(
        O,
        len,
        SortCompare,
        'READ-THROUGH-HOLES'
    );

    let j = 0;

    while (j < len) {
        CreateDataPropertyOrThrow(A, ToString(j), sortedList[j]);

        j++;
    }

    return A;
}
