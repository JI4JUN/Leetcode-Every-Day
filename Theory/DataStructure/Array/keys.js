import { ToObject } from 'utils/AbstractOperations/TypeConversion';
import { CreateArrayIterator } from 'utils/IndexedCollections/ArrayObjects/ArrayIteratorObjects';
export function tinyKeys() {
    const O = ToObject(this);

    return CreateArrayIterator(O, 'KEY');
}
