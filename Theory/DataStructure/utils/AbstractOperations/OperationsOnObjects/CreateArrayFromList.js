import { ToString } from '../TypeConversion';
import { CreateDataPropertyOrThrow } from './CreateDataPropertyOrThrow';

/**
 * https://tc39.es/ecma262/#sec-createarrayfromlist
 *
 * The abstract operation CreateArrayFromList is used to create an Array whose elements are provided by elements.
 *
 * ```markdown
 * 1. Let array be ! ArrayCreate(0).
 * 2. Let n be 0.
 * 3. For each element e of elements, do
 * a. Perform ! CreateDataPropertyOrThrow(array, ! ToString(𝔽(n)), e).
 * b. Set n to n + 1.
 * 4. Return array.
 * ```
 *
 * @param {*} elements A List of ECMAScript language values.
 * @returns An Array.
 */
export function CreateArrayFromList(elements) {
    const array = [];

    let n = 0;

    for (const e of elements) {
        CreateDataPropertyOrThrow(array, ToString(n), e);

        n++;
    }

    return array;
}
