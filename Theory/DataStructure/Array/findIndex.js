import { LengthOfArrayLike, ToObject } from '../utils/AbstractOperations';
import { FindViaPredicate } from './findLastIndex';

/**
 * ```Markdown
 * Array.prototype.findIndex(predicate [ , thisArg ])
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let findRec be ? FindViaPredicate(O, len, ASCENDING, predicate, thisArg).
 * 4. Return findRec.[[Index]].
 * ```
 *
 * https://tc39.es/ecma262/#sec-array.prototype.find
 */
export function tinyFindIndex(predicate, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const findRec = FindViaPredicate(O, len, 'ASCENDING', predicate, thisArg);

    return findRec.index;
}
