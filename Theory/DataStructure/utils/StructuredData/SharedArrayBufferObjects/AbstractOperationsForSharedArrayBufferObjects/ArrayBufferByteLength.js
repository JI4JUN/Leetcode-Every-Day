import { IsSharedArrayBuffer } from 'utils/StructuredData/SharedArrayBufferObjects/AbstractOperationsForSharedArrayBufferObjects';
import { GetRawBytesFromSharedBlock } from 'utils/StructuredData/SharedArrayBufferObjects/AbstractOperationsForSharedArrayBufferObjects';
import {
    IsDetachedBuffer,
    RawBytesToNumeric
} from 'utils/StructuredData/ArrayBufferObjects/AbstractOperationsForArrayBufferObjects';
import { Assert } from 'utils/Assert';

/**
 * https://tc39.es/ecma262/#sec-arraybufferbytelength
 *
 * The abstract operation ArrayBufferByteLength determines and returns the length in bytes of an ArrayBuffer or SharedArrayBuffer.
 *
 * ```markdown
 * 1. If IsSharedArrayBuffer(arrayBuffer) is true and arrayBuffer has an [[ArrayBufferByteLengthData]] internal slot, then
 *     a. Let bufferByteLengthBlock be arrayBuffer.[[ArrayBufferByteLengthData]].
 *     b. Let rawLength be GetRawBytesFromSharedBlock(bufferByteLengthBlock, 0, BIGUINT64, true, order).
 *     c. Let isLittleEndian be the value of the [[LittleEndian]] field of the surrounding agent's Agent Record.
 *     d. Return ℝ(RawBytesToNumeric(BIGUINT64, rawLength, isLittleEndian)).
 * 2. Assert: IsDetachedBuffer(arrayBuffer) is false.
 * 3. Return arrayBuffer.[[ArrayBufferByteLength]].
 * ```
 *
 * @param {*} arrayBuffer An ArrayBuffer or SharedArrayBuffer.
 * @param {*} order SEQ-CST or UNORDERED.
 * @returns A non-negative integer.
 */
export function ArrayBufferByteLength(arrayBuffer, order) {
    if (
        IsSharedArrayBuffer(arrayBuffer) === true &&
        arrayBuffer._ArrayBufferByteLengthData !== undefined
    ) {
        // note: Use _ArrayBufferByteLengthData simulate [[ArrayBufferByteLengthData]] internal slot, beacause we can't access it in JS.
        const bufferByteLengthBlock = arrayBuffer._ArrayBufferByteLengthData;
        const rawLength = GetRawBytesFromSharedBlock(
            bufferByteLengthBlock,
            0,
            'BIGUINT64',
            true,
            order
        );
        const isLittleEndian = true;

        return RawBytesToNumeric('BIGUINT64', rawLength, isLittleEndian);
    }

    Assert(IsDetachedBuffer(arrayBuffer) === false);

    return arrayBuffer.byteLength;
}
