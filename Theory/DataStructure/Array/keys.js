import { ToObject } from 'utils/AbstractOperations/TypeConversion';
import { CreateArrayIterator } from 'utils/IndexedCollections/ArrayObjects/ArrayIteratorObjects';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.keys
 *
 * Array.prototype.keys()
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Return CreateArrayIterator(O, KEY).
 * ```
 */
export function tinyKeys() {
    const O = ToObject(this);

    return CreateArrayIterator(O, 'KEY');
}
