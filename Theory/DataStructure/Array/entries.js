import { ToObject } from 'utils/AbstractOperations/TypeConversion';
import { CreateArrayIterator } from 'utils/IndexedCollections/ArrayObjects/ArrayIteratorObjects';

/**
 * https://tc39.es/ecma262/#sec-array.prototype.entries
 *
 * Array.prototype.entries()
 *
 * ```markdown
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Return CreateArrayIterator(O, KEY+VALUE).
 * ```
 */
export function mockEntries() {
    const O = ToObject(this);

    return CreateArrayIterator(O, 'KEY+VALUE');
}
