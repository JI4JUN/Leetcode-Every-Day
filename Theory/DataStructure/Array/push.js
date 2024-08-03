import { LengthOfArrayLike, ToObject } from '../utils/AbstractOperations/index';

export function tinyPush(...items) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const argCount = items.length;

    if (len + argCount > Math.pow(2, 53) - 1) {
        throw new TypeError('The array length must not exceed 2^53 - 1');
    }
}
