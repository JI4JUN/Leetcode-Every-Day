/**
 * https://tc39.es/ecma262/#sec-isdetachedbuffer
 *
 * The abstract operation IsDetachedBuffer determines whether an ArrayBuffer is detached.
 *
 * ```markdown
 * Steps:
 * 1. If arrayBuffer.[[ArrayBufferData]] is null, return true.
 * 2. Return false.
 * ```
 * @param {*} arrayBuffer An ArrayBuffer or a SharedArrayBuffer.
 * @returns A boolean.
 */
export function IsDetachedBuffer(arrayBuffer) {
    if (arrayBuffer.detached !== undefined) {
        return arrayBuffer.detached;
    }

    return false;
}
