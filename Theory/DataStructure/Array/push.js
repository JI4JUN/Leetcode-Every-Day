import {
    CreateDataProperty,
    LengthOfArrayLike,
    ToObject,
    Set,
    ToString
} from '../utils/AbstractOperations/index';

export function tinyPush(...items) {
    const O = ToObject(this);
    const argCount = items.length;

    // if (!O.hasOwnProperty('length') || !('length' in O)) {
    //     CreateDataProperty(O, 'length', 0);
    // }

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
