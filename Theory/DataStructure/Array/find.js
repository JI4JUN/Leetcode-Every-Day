import { ToObject, LengthOfArrayLike } from '../utils/AbstractOperations/index';

/**
 * Array.prototype.find(predicate [, thisArg ])
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let len be ? LengthOfArrayLike(O).
 * 3. Let findRec be ? FindViaPredicate(O, len, ASCENDING, predicate, thisArg).
 * 4. Return findRec.[[Value]].
 *
 * https://tc39.es/ecma262/#sec-array.prototype.find
 */
export function TinyFind(predicate, thisArg) {
    const O = ToObject(this);
    const len = LengthOfArrayLike(O);
}
