import { ArrayBufferByteLength } from 'utils/StructuredData/SharedArrayBufferObjects/AbstractOperationsForSharedArrayBufferObjects';
import { IsDetachedBuffer } from 'utils/StructuredData/ArrayBufferObjects/AbstractOperationsForArrayBufferObjects';

/**
 * https://tc39.es/ecma262/#sec-maketypedarraywithbufferwitnessrecord
 *
 * The abstract operation MakeTypedArrayWithBuffer is to create a record that captures the state
 * of a TypedArray object in relation to its underlying buffer at a specific point in time.
 *
 * ```markdown
 * 1. Let buffer be obj.[[ViewedArrayBuffer]].
 * 2. If IsDetachedBuffer(buffer) is true, then
 *     a. Let byteLength be DETACHED.
 * 3. Else,
 *     a. Let byteLength be ArrayBufferByteLength(buffer, order).
 * 4. Return the TypedArray With Buffer Witness Record { [[Object]]: obj, [[CachedBufferByteLength]]: byteLength }.
 * ```
 *
 * @param {*} obj A TypedArray.
 * @param {*} order SEQ-CST or UNORDERED.
 * @returns TypedArray With Buffer Witness Record.
 */
export function MakeTypedArrayWithBufferWitnessRecord(obj, order) {
    const buffer = obj.buffer;

    let byteLength;

    if (IsDetachedBuffer(buffer)) {
        byteLength = 'DETACHED';
    } else {
        byteLength = ArrayBufferByteLength(buffer, order);
    }

    return {
        object: obj,
        cachedBufferByteLength: byteLength
    };
}
