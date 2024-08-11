/**
 * ```markdown
 * The abstract operation IsSharedArrayBuffer tests whether an object is an ArrayBuffer,
 * a SharedArrayBuffer, or a subtype of either.
 *
 * Steps:
 * 1. Let bufferData be obj.[[ArrayBufferData]].
 * 2. If bufferData is null, return false.
 * 3. If bufferData is a Data Block, return false.
 * 4. Assert: bufferData is a Shared Data Block.
 * 5. Return true.
 * ```
 * @param {*} obj An ArrayBuffer or a SharedArrayBuffer.
 * @returns A Boolean.
 */
export function IsSharedArrayBuffer(obj) {
    return obj instanceof SharedArrayBuffer;
}
