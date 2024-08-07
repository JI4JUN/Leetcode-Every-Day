import {
    Get,
    Set,
    ToBoolean,
    ToObject,
    IsArray,
    LengthOfArrayLike,
    ToString,
    HasProperty,
    CreateDataPropertyOrThrow
} from '../utils/AbstractOperations/index';

/**
 * Array.prototype.concat(...items)
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let A be ? ArraySpeciesCreate(O, 0).
 * 3. Let n be 0.
 * 4. Prepend O to items.
 * 5. For each element E of items, do
 *     a. Let spreadable be ? IsConcatSpreadable(E).
 *     b. If spreadable is true, then
 *         i. Let len be ? LengthOfArrayLike(E).
 *         ii. If n + len > 2**53 - 1, throw a TypeError exception.
 *         iii. Let k be 0.
 *         iv. Repeat, while k < len,
 *             1. Let Pk be ! ToString(𝔽(k)).
 *             2. Let exists be ? HasProperty(E, Pk).
 *             3. If exists is true, then
 *                 a. Let subElement be ? Get(E, Pk).
 *                 b. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(n)), subElement).
 *             4. Set n to n + 1.
 *             5. Set k to k + 1.
 *     c. Else,
 *         i. NOTE: E is added as a single item rather than spread.
 *         ii. If n ≥ 2**53 - 1, throw a TypeError exception.
 *         iii. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(n)), E).
 *         iv. Set n to n + 1.
 * 6. Perform ? Set(A, "length", 𝔽(n), true).
 * 7. Return A.
 */
export function tinyConcat(...items) {
    const O = ToObject(this);
    const A = new Array();

    let n = 0;

    items = [O, ...items];

    for (const E of items) {
        const spreadable = IsConcatSpreadable(E);

        if (spreadable === true) {
            const len = LengthOfArrayLike(E);

            if (n + len > Math.pow(2, 53) - 1) {
                throw new TypeError(
                    'The array length must not exceed 2^53 - 1'
                );
            }

            let k = 0;

            while (k < len) {
                const Pk = ToString(k);
                const exists = HasProperty(E, Pk);

                if (exists === true) {
                    const subElement = Get(E, Pk);

                    CreateDataPropertyOrThrow(A, ToString(n), subElement);
                }

                n++;
                k++;
            }
        } else {
            if (n >= Math.pow(2, 53) - 1) {
                throw new TypeError(
                    'The array length must not exceed 2^53 - 1'
                );
            }

            CreateDataPropertyOrThrow(A, ToString(n), E);

            n++;
        }
    }

    Set(A, 'length', n, true);

    return A;
}

/**
 * The abstract operation IsConcatSpreadable is used to determine whether a Object is spreadable.
 *
 * Steps:
 * 1. If O is not an Object, return false.
 * 2. Let spreadable be ? Get(O, %Symbol.isConcatSpreadable%).
 * 3. If spreadable is not undefined, return ToBoolean(spreadable).
 * 4. Return ? IsArray(O).
 *
 * @param {*} O An Object.
 * @returns A Boolean.
 */
export function IsConcatSpreadable(O) {
    if (typeof O !== 'object' || O === null) {
        return false;
    }

    const spreadable = Get(O, Symbol.isConcatSpreadable);

    if (spreadable !== undefined) {
        return ToBoolean(spreadable);
    }

    return IsArray(O);
}
