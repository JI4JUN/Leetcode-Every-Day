/**
 * The abstract operation TypedArrayElementSize is used to get the element size of a typed array.
 *
 * ```markdown
 * Steps:
 * 1. Return the Element Size value specified in Table 69 for O.[[TypedArrayName]].
 * ```
 *
 * @param {*} O A TypedArray.
 * @returns A non-negative integer.
 */
export function TypedArrayElementSize(O) {
    const elementSizeTable = {
        Int8Array: 1,
        Uint8Array: 1,
        Uint8ClampedArray: 1,
        Int16Array: 2,
        Uint16Array: 2,
        Int32Array: 4,
        Uint32Array: 4,
        BigInt64Array: 8,
        BigUint64Array: 8,
        Float32Array: 4,
        Float64Array: 8
    };
    const elementSize = elementSizeTable[O[Symbol.toStringTag]];

    return elementSize;
}
