import {
    LengthOfArrayLike,
    ToObject,
    Set,
    ToString
} from '../utils/AbstractOperations';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.push
 *
 * Array.prototype.push(...items)
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let argCount be the number of elements in items.
 * 4. If len + argCount > 2**53 - 1, throw a TypeError exception.
 * 5. For each element E of items, do
 *     a. Perform ? Set(O, ! ToString(𝔽(len)), E, true).
 *     b. Set len to len + 1.
 * 6. Perform ? Set(O, "length", 𝔽(len), true).
 * 7. Return 𝔽(len).
 * ```
 */
export function tinyPush(...items) {
    const O = ToObject(this);
    const argCount = items.length;

    let len = LengthOfArrayLike(O);

    if (len + argCount > Math.pow(2, 53) - 1) {
        throw new TypeError('The array length must not exceed 2^53 - 1');
    }

    for (const E of items) {
        Set(O, ToString(len), E, true);

        len++;
    }

    Set(O, 'length', len, true);

    return len;
}
