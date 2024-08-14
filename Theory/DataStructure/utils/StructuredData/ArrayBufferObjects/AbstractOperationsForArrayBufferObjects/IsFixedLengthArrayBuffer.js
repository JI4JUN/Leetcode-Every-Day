/**
 * The abstract operation IsFixedLengthArrayBuffer detemines the array buffer whether it has a fixed length.
 *
 * ```markdown
 * Steps:
 * 1. If arrayBuffer has an [[ArrayBufferMaxByteLength]] internal slot, return false.
 * 2. Return true.
 * ```
 *
 * @param {*} arrayBuffer An ArrayBuffer or a SharedArrayBuffer.
 * @returns A Boolean.
 */
export function IsFixedLengthArrayBuffer(arrayBuffer) {
    return !arrayBuffer.resizable;
}
