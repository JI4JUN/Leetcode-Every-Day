import {
    Get,
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    ToString
} from '../utils/AbstractOperations';

export function tinyIncludes(searchElement, fromIndex) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (len === 0) {
        return false;
    }

    let n = ToIntegerOrInfinity(len);

    if (fromIndex === undefined) {
        n = 0;
    }

    if (n === +Infinity) {
        return false;
    } else if (n === -Infinity) {
        n = 0;
    }

    let k;

    if (n >= 0) {
        k = n;
    } else {
        k = len + n;

        if (k < 0) {
            k = 0;
        }
    }

    while (k < len) {
        const elementK = Get(O, ToString(k));
    }
}
