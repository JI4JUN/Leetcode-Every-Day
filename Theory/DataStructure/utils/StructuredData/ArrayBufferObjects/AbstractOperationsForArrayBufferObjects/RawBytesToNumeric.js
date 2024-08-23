import { mockForEach, mockIncludes, mockMap, mockJoin } from 'Array';
import { IsBigIntElementType } from 'utils/StructuredData/SharedArrayBufferObjects/AbstractOperationsForSharedArrayBufferObjects';
import { IsUnsignedElementType } from 'utils/StructuredData/ArrayBufferObjects/AbstractOperationsForArrayBufferObjects';

Array.prototype.mockForEach = mockForEach;
Array.prototype.mockIncludes = mockIncludes;
Array.prototype.mockMap = mockMap;
Array.prototype.mockJoin = mockJoin;

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
    if (!isLittleEndian) {
        // note: Need to implement my own reverse function in the future.
        rawBytes.reverse();
    }

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
    const buffer = new ArrayBuffer(elementSize);
    const view = new DataView(buffer);

    rawBytes.mockForEach((byte, index) => view.setUint8(index, byte));

    const typeHandler = {
        INT8: () => view.getInt8(0, true),
        UINT8: () => view.getUint8(0, true),
        UINT8CLAMPED: () => view.getUint8(0, true),
        INT16: () => view.getInt16(0, true),
        UINT16: () => view.getUint16(0, true),
        INT32: () => view.getInt32(0, true),
        UINT32: () => view.getUint32(0, true),
        BIGINT64: () => view.getBigInt64(0, true),
        BIGUINT64: () => view.getBigUint64(0, true),
        FLOAT32: () => view.getFloat32(0, true),
        FLOAT64: () => view.getFloat64(0, true)
    };
    const getIntValueHandler = typeHandler[type];

    let intValue;

    if (IsUnsignedElementType(type)) {
        intValue = getIntValueHandler();
    } else {
        intValue = Number(getIntValueHandler());
    }

    if (IsBigIntElementType(type)) {
        return BigInt(intValue);
    }

    return Number(intValue);
}
