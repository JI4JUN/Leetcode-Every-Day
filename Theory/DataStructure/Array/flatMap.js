import {
    IsCallable,
    LengthOfArrayLike,
    ToObject
} from '../utils/AbstractOperations';
import { FlattenIntoArray } from './flat';

export function tinyFlatMap(mapperFunction, thisArg) {
    const O = ToObject(this);
    const sourceLen = LengthOfArrayLike(O);

    if (IsCallable(mapperFunction) === false) {
        throw new TypeError(
            `${typeof mapperFunction} ${
                Object.is(mapperFunction, undefined) ? '' : mapperFunction
            } is not a function`
        );
    }

    const A = new Array();

    FlattenIntoArray(A, O, sourceLen, 0, 1, mapperFunction, thisArg);

    return A;
}
