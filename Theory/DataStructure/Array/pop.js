import {
    LengthOfArrayLike,
    ToObject,
    Get,
    Set,
    ToString,
    DeletePropertyOrThrow
} from '../utils/AbstractOperations/index';

/**
 * Array.prototype.pop()
 *
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
 */
export function tinyPop() {
    const O = ToObject(this);

    let len = LengthOfArrayLike(O);

    if (len === 0) {
        Set(O, 'length', +0, true);

        return undefined;
    } else {
        const newLen = len - 1;
        const index = ToString(newLen);
        const element = Get(O, index);

        DeletePropertyOrThrow(O, index);

        Set(O, 'length', newLen, true);

        return element;
    }
}
