import { ToObject } from 'utils/AbstractOperations/TypeConversion';
import { CreateArrayIterator } from 'utils/IndexedCollections/ArrayObjects/ArrayIteratorObjects';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.values
 *
 * Array.prototype.values()
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Return CreateArrayIterator(O, value).
 * ```
 */
export function tinyValues() {
    const O = ToObject(this);

    return CreateArrayIterator(O, 'VALUE');
}
