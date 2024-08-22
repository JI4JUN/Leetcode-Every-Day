import {
    Call,
    DeletePropertyOrThrow,
    Get,
    HasProperty,
    Set
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    IsCallable,
    IsLessThan
} from 'utils/AbstractOperations/TestingAndComparsionOperations';
import {
    LengthOfArrayLike,
    ToNumber,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';
import { tinyPush } from './push';
import { Assert } from 'utils/Assert';

Array.prototype.tinyPush = tinyPush;

/**
 * https://tc39.es/ecma262/#sec-array.prototype.sort
 *
 * Array.prototype.sort(comparator)
 *
 * ```markdown
 * Steps:
 * 1. If comparator is not undefined and IsCallable(comparator) is false, throw a TypeError exception.
 * 2. Let obj be ? ToObject(this value).
 * 3. Let len be ? LengthOfArrayLike(obj).
 * 4. Let SortCompare be a new Abstract Closure with parameters (x, y) that captures comparator and performs the following steps when called:
 *     a. Return ? CompareArrayElements(x, y, comparator).
 * 5. Let sortedList be ? SortIndexedProperties(obj, len, SortCompare, skip-holes).
 * 6. Let itemCount be the number of elements in sortedList.
 * 7. Let j be 0.
 * 8. Repeat, while j < itemCount,
 *     a. Perform ? Set(obj, ! ToString(𝔽(j)), sortedList[j], true).
 *     b. Set j to j + 1.
 * 9. NOTE: The call to SortIndexedProperties in step 5 uses skip-holes. The remaining indices are deleted to preserve the number of holes that were detected and excluded from the sort.
 * 10. Repeat, while j < len,
 *     a. Perform ? DeletePropertyOrThrow(obj, ! ToString(𝔽(j))).
 *     b. Set j to j + 1.
 * 11. Return obj.
 * ```
 */
export function tinySort(comparator) {
    if (comparator !== undefined && IsCallable(comparator) === false) {
        throw new TypeError('Comparator must be a function or undefined');
    }

    const obj = ToObject(this);
    const len = LengthOfArrayLike(obj);
    const SortCompare = (x, y) => CompareArrayElements(x, y, comparator);
    const sortedList = SortIndexedProperties(
        obj,
        len,
        SortCompare,
        'SKIP-HOLES'
    );
    const itemCount = sortedList.length;

    let j = 0;

    while (j < itemCount) {
        Set(obj, ToString(j), sortedList[j], true);

        j++;
    }

    while (j < len) {
        DeletePropertyOrThrow(obj, ToString(j));

        j++;
    }

    return obj;
}

/**
 * https://tc39.es/ecma262/#sec-sortindexedproperties
 *
 * The abstract operation SortIndexedProperties returns the sorted array base on given obj and holes.
 *
 * ```markdown
 * Steps:
 * 1. Let items be a new empty List.
 * 2. Let k be 0.
 * 3. Repeat, while k < len,
 *     a. Let Pk be ! ToString(𝔽(k)).
 *     b. If holes is skip-holes, then
 *         i. Let kRead be ? HasProperty(obj, Pk).
 *     c. Else,
 *         i. Assert: holes is read-through-holes.
 *         ii. Let kRead be true.
 *     d. If kRead is true, then
 *         i. Let kValue be ? Get(obj, Pk).
 *         ii. Append kValue to items.
 *     e. Set k to k + 1.
 * 4. Sort items using an implementation-defined sequence of calls to SortCompare. If any such call returns an abrupt completion, stop before performing any further calls to SortCompare and return that Completion Record.
 * 5. Return items.
 * ```
 *
 * @param {*} obj An Object.
 * @param {*} len A non-negative integer.
 * @param {*} SortCompare An Abstract Closure with two parameters.
 * @param {*} holes skip-holes or read-through-holes.
 * @returns Either a normal completion containing a List of ECMAScript language values or a throw completion.
 */
export function SortIndexedProperties(obj, len, SortCompare, holes) {
    const items = [];
    let k = 0;

    while (k < len) {
        const Pk = ToString(k);

        let kRead;

        if (holes === 'SKIP-HOLES') {
            kRead = HasProperty(obj, Pk);
        } else {
            Assert(holes === 'READ-THROUGH-HOLES');

            kRead = true;
        }

        if (kRead) {
            const kValue = Get(obj, Pk);

            items.tinyPush(kValue);
        }

        k++;
    }

    function quickSort(arr, left, right) {
        if (left < right) {
            const partitionIndex = partition(arr, left, right);

            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
    }

    function partition(arr, left, right) {
        const pivot = arr[right];

        let i = left;
        let j = right - 1;

        while (true) {
            while (i < right && SortCompare(arr[i], pivot) <= 0) {
                i++;
            }
            while (j > left && SortCompare(arr[j], pivot) > 0) {
                j--;
            }

            if (i >= j) {
                break;
            }

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        [arr[i], arr[right]] = [arr[right], arr[i]];

        return i;
    }

    quickSort(items, 0, items.length - 1);

    return items;
}

/**
 * https://tc39.es/ecma262/#sec-comparearrayelements
 *
 * The abstract operation CompareArrayElements provides a standardized method to compare two values,
 * either using a custom comparator or lexicographically as strings, with special handling for undefined values.
 *
 * ```markdown
 * Steps:
 * 1. If x and y are both undefined, return +0𝔽.
 * 2. If x is undefined, return 1𝔽.
 * 3. If y is undefined, return -1𝔽.
 * 4. If comparator is not undefined, then
 *     a. Let v be ? ToNumber(? Call(comparator, undefined, « x, y »)).
 *     b. If v is NaN, return +0𝔽.
 *     c. Return v.
 * 5. Let xString be ? ToString(x).
 * 6. Let yString be ? ToString(y).
 * 7. Let xSmaller be ! IsLessThan(xString, yString, true).
 * 8. If xSmaller is true, return -1𝔽.
 * 9. Let ySmaller be ! IsLessThan(yString, xString, true).
 * 10. If ySmaller is true, return 1𝔽.
 * 11. Return +0𝔽.
 * ```
 *
 * @param {*} x An ECMAScript language value.
 * @param {*} y An ECMAScript language value.
 * @param {*} comparator A function object or undefined.
 * @returns Either a normal completion containing a Number or an abrupt completion.
 */
export function CompareArrayElements(x, y, comparator) {
    if (x === undefined && y === undefined) {
        return +0;
    }

    if (x === undefined) {
        return +1;
    }

    if (y === undefined) {
        return -1;
    }

    if (comparator !== undefined) {
        const v = ToNumber(Call(comparator, undefined, [x, y]));

        if (Number.isNaN(v)) {
            return +0;
        }

        return v;
    }

    const xString = ToString(x);
    const yString = ToString(y);
    const xSmaller = IsLessThan(xString, yString, true);

    if (xSmaller) {
        return -1;
    }

    const ySmaller = IsLessThan(yString, xString, true);

    if (ySmaller) {
        return 1;
    }

    return +0;
}
