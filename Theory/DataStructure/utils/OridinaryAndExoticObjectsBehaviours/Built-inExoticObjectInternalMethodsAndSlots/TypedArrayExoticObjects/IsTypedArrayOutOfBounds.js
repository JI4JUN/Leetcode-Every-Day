import { TypedArrayElementSize } from 'utils/IndexedCollections/TypedArrayObjects/AbstractOperationsForTypedArrayObjects';

/**
 * https://tc39.es/ecma262/#sec-istypedarrayoutofboundsss
 *
 * The abstract operation IsTypedArrayOutOfBounds checks if any of the object's numeric properties
 * reference a value at an index not contained within the underlying buffer's bounds.
 *
 * ```markdown
 * Steps:
 * 1. Let O be taRecord.[[Object]].
 * 2. Let bufferByteLength be taRecord.[[CachedBufferByteLength]].
 * 3. Assert: IsDetachedBuffer(O.[[ViewedArrayBuffer]]) is true if and only if bufferByteLength is DETACHED.
 * 4. If bufferByteLength is DETACHED, return true.
 * 5. Let byteOffsetStart be O.[[ByteOffset]].
 * 6. If O.[[ArrayLength]] is AUTO, then
 *     a. Let byteOffsetEnd be bufferByteLength.
 * 7. Else,
 *     a. Let elementSize be TypedArrayElementSize(O).
 *     b. Let byteOffsetEnd be byteOffsetStart + O.[[ArrayLength]] × elementSize.
 * 8. If byteOffsetStart > bufferByteLength or byteOffsetEnd > bufferByteLength, return true.
 * 9. NOTE: 0-length TypedArrays are not considered out-of-bounds.
 * 10. Return false.
 * ```
 *
 * @param {*} taRecord A TypedArray With Buffer Witness Record.
 * @returns A Boolean.
 */
export function IsTypedArrayOutOfBounds(taRecord) {
    const O = taRecord.object;
    const bufferByteLength = taRecord.cachedBufferByteLength;

    if (bufferByteLength === 'DETACHED') {
        return true;
    }

    const byteOffsetStart = O.byteOffset;

    let byteOffsetEnd;

    if (O.length === undefined) {
        byteOffsetEnd = bufferByteLength;
    } else {
        const elementSize = TypedArrayElementSize(O);

        byteOffsetEnd = byteOffsetStart + O.length * elementSize;
    }

    if (
        byteOffsetStart > bufferByteLength ||
        byteOffsetEnd > bufferByteLength
    ) {
        return true;
    }

    return false;
}
