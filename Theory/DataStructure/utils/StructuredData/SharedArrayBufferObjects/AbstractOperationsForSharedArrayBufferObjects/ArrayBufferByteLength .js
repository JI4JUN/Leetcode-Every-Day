import { IsSharedArrayBuffer } from './IsSharedArrayBuffer';
import { GetRawBytesFromSharedBlock } from './GetRawBytesFromSharedBlock';
import { IsDetachedBuffer } from '../../ArrayBufferObjects/';

/**
 * https://tc39.es/ecma262/#sec-arraybufferbytelength
 *
 * The abstract operation ArrayBufferByteLength
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
        arrayBuffer.buffer !== undefined
    ) {
        const bufferByteLengthBlock = arrayBuffer.buffer;
        const rawLength = GetRawBytesFromSharedBlock(
            bufferByteLengthBlock,
            0,
            BIGUINT64,
            true,
            order
        );
        const isLittleEndian = true;

        return RawBytesToNumeric('BIGUINT64', rawLength, isLittleEndian);
    }

    if (IsDetachedBuffer(arrayBuffer)) {
        throw new Error('ArrayBuffer is detached');
    }

    return arrayBuffer.byteLength;
}
