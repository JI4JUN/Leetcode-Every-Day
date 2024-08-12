import { IsSharedArrayBuffer } from './IsSharedArrayBuffer';

export function ArrayBufferByteLength(arrayBuffer, order) {
    if (
        IsSharedArrayBuffer(arrayBuffer) === true &&
        arrayBuffer.byteLength !== undefined
    ) {
        const bufferByteLengthBlock = arrayBuffer.byteLength;
        const rawLength = GetRawBytesFromSharedBlock(
            bufferByteLengthBlock,
            0,
            BIGUINT64,
            true,
            order
        );
    }
}
