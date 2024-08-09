import { LengthOfArrayLike, ToObject } from '../utils/AbstractOperations';

export function tinyIndexOf(searchElement, fromIndex) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (len === 0) {
        return -1;
    }
}
