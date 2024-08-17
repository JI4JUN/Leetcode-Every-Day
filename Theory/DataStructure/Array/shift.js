import {
    DeletePropertyOrThrow,
    Get,
    HasProperty,
    Set
} from 'utils/AbstractOperations/OperationsOnObjects';
import {
    LengthOfArrayLike,
    ToObject,
    ToString
} from 'utils/AbstractOperations/TypeConversion';

export function tinyShift() {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (len === 0) {
        Set(O, 'length', +0, true);

        return undefined;
    }

    let first = Get(O, '0');
    let k = 1;

    while (k < len) {
        const from = ToString(k);
        const to = ToString(k - 1);
        const fromPresent = HasProperty(O, from);

        if (fromPresent) {
            const fromValue = Get(O, from);

            Set(O, to, fromValue, true);
        } else {
            DeletePropertyOrThrow(O, to);
        }

        k++;
    }

    DeletePropertyOrThrow(O, ToString(len - 1));
    Set(O, 'length', len - 1, true);

    return first;
}
