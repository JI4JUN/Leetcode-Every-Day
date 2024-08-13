/**
 * https://tc39.es/ecma262/#sec-rawbytestonumeric
 * 
 * The abstract operation RawBytesToNumeric is designed to convert a sequence of raw bytesinto a
 * numeric value (either a Number or a BigInt) based on a specified data type and endianness.
 *
 * ```markdown
 * Steps:
 * 1. Let elementSize be the Element Size value specified in Table 69 for Element Type type.
 * 2. If isLittleEndian is false, reverse the order of the elements of rawBytes.
 * 3. If type is FLOAT32, then
 *     a. Let value be the byte elements of rawBytes concatenated and interpreted as a little-endian bit string encoding of an IEEE 754-2019 binary32 value.
 *     b. If value is an IEEE 754-2019 binary32 NaN value, return the NaN Number value.
 *     c. Return the Number value that corresponds to value.
 * 4. If type is FLOAT64, then
 *     a. Let value be the byte elements of rawBytes concatenated and interpreted as a little-endian bit string encoding of an IEEE 754-2019 binary64 value.
 *     b. If value is an IEEE 754-2019 binary64 NaN value, return the NaN Number value.
 *     c. Return the Number value that corresponds to value.
 * 5. If IsUnsignedElementType(type) is true, then
 *     a. Let intValue be the byte elements of rawBytes concatenated and interpreted as a bit string encoding of an unsigned little-endian binary number.
 * 6. Else,
 *     a. Let intValue be the byte elements of rawBytes concatenated and interpreted as a bit string encoding of a binary little-endian two's complement number of bit length elementSize × 8.
 * 7. If IsBigIntElementType(type) is true, return the BigInt value that corresponds to intValue.
 * 8. Otherwise, return the Number value that corresponds to intValue.
 * ```
 * @param {*} type A TypedArray element type.
 * @param {*} rawBytes A List of byte values.
 * @param {*} isLittleEndian A Boolean.
 * @return A Number or a BigInt.
 */
export function RawBytesToNumeric(type, rawBytes, isLittleEndian) {
    const elementSizeTable = {
        INT8: 1,
        UINT8: 1,
        UINT8CLAMPED: 1,
        INT16: 2,
        UINT16: 2,
        INT32: 4,
        UINT32: 4,
        BIGINT64: 8,
        BIGUINT64: 8,
        FLOAT32: 4,
        FLOAT64: 8
    };

    const elementSize = elementSizeTable[type] || 0;

    if (!isLittleEndian) {
        // note: Need to implement my own reverse function in the future.
        rawBytes.reverse();
    }

    if (type === 'FLOAT32' || type === 'FLOAT64') {
        const buffer = new ArrayBuffer(elementSize);
        const view = new DataView(buffer);

        // note: Need to implement my own forEach function in the future.
        rawBytes.forEach((byte, index) => view.setUint8(index, byte));

        const value =
            type === 'FLOAT32'
                ? view.getFloat32(0, true)
                : view.getFloat64(0, true);

        if (Object.is(value, NaN)) {
            return NaN;
        }

        return value;
    } else if ([])
}
