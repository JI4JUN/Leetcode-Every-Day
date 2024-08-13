import { LengthOfArrayLike, ToObject } from '../utils/AbstractOperations';
import { FindViaPredicate } from './findLastIndex';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.findlast
 *
 * Array.prototype.findLast(predicate [, thisArg])
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let findRec be ? FindViaPredicate(O, len, DESCENDING, predicate, thisArg).
 * 4. Return findRec.[[Value]].
 * ```
 */
export function tinyFindLast(predicate, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const findRec = FindViaPredicate(O, len, 'DESCENDING', predicate, thisArg);

    return findRec.value;
}
