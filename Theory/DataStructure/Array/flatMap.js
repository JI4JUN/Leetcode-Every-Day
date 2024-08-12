import {
    IsCallable,
    LengthOfArrayLike,
    ToObject
} from '../utils/AbstractOperations';
import { FlattenIntoArray } from './flat';

/**
 * Array.prototype.flatMap(mapperFunction [, thisArg])
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let sourceLen be ? LengthOfArrayLike(O).
 * 3. If IsCallable(mapperFunction) is false, throw a TypeError exception.
 * 4. Let A be ? ArraySpeciesCreate(O, 0).
 * 5. Perform ? FlattenIntoArray(A, O, sourceLen, 0, 1, mapperFunction, thisArg).
 * 6. Return A.
 * ```
 *
 * https://tc39.es/ecma262/#sec-array.prototype.flatmap
 */
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
