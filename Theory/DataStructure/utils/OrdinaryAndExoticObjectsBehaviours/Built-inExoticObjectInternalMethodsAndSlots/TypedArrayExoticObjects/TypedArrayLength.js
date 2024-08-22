import { IsFixedLengthArrayBuffer } from 'utils/StructuredData/ArrayBufferObjects/AbstractOperationsForArrayBufferObjects';
import { IsTypedArrayOutOfBounds } from './IsTypedArrayOutOfBounds';
import { TypedArrayElementSize } from 'utils/IndexedCollections/TypedArrayObjects/AbstractOperationsForTypedArrayObjects';
import { Assert } from 'utils/Assert';

/**
 * https://tc39.es/ecma262/#sec-typedarraylength
 *
 * The abstract operation TypedArrayLength is to get the length of a typed array.
 *
 * ```markdown
 * Steps:
 * 1. Assert: IsTypedArrayOutOfBounds(taRecord) is false.
 * 2. Let O be taRecord.[[Object]].
 * 3. If O.[[ArrayLength]] is not AUTO, return O.[[ArrayLength]].
 * 4. Assert: IsFixedLengthArrayBuffer(O.[[ViewedArrayBuffer]]) is false.
 * 5. Let byteOffset be O.[[ByteOffset]].
 * 6. Let elementSize be TypedArrayElementSize(O).
 * 7. Let byteLength be taRecord.[[CachedBufferByteLength]].
 * 8. Assert: byteLength is not DETACHED.
 * 9. Return floor((byteLength - byteOffset) / elementSize).
 * ```
 *
 * @param {*} taRecord A TypedArray With Buffer Witness Record.
 * @returns A non-negative integer.
 */
export function TypedArrayLength(taRecord) {
    Assert(IsTypedArrayOutOfBounds(taRecord) === false);

    const O = taRecord.object;

    if (O.length !== undefined) {
        return O.length;
    }

    Assert(IsFixedLengthArrayBuffer(O.buffer) === false);

    const byteOffset = O.byteOffset;
    const elementSize = TypedArrayElementSize(O);
    const byteLength = taRecord.cachedBufferByteLength;

    Assert(byteLength !== 'DETACHED');

    return Math.floor((byteLength - byteOffset) / elementSize);
}
