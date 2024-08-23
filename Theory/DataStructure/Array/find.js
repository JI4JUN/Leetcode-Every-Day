import {
    ToObject,
    LengthOfArrayLike
} from 'utils/AbstractOperations/TypeConversion';
import { FindViaPredicate } from 'Array/findLastIndex';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.find
 *
 * Array.prototype.find(predicate [ , thisArg])
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let findRec be ? FindViaPredicate(O, len, ASCENDING, predicate, thisArg).
 * 4. Return findRec.[[Value]].
 * ```
 */
export function mockFind(predicate, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
    const findRec = FindViaPredicate(O, len, 'ASCENDING', predicate, thisArg);

    return findRec.Value;
}
