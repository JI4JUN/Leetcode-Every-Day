import {
    Call,
    Get,
    IsCallable,
    LengthOfArrayLike,
    ToBoolean,
    ToObject,
    ToString
} from '../utils/AbstractOperations/index';

export function tinyFilter(callbackfn, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);

    if (IsCallable(callbackfn) === false) {
        throw new TypeError(
            `${typeof callbackfn} ${
                Object.is(callbackfn, undefined) ? '' : callbackfn
            } is not a function`
        );
    }

    const A = [];

    let k = 0;
    let to = 0;

    while (k < len) {
        const Pk = ToString(k);
        const kPresent = HasProperty(O, Pk);

        if (kPresent === true) {
            const kValue = Get(O, Pk);

            const selected = ToBoolean(
                Call(callbackfn, thisArg, [kValue, k, O])
            );

            if (selected === true) {
                to++;
            }
        }

        k++;
    }

    return A;
}
