import { tinyIncludes } from '../../../../Array';

Array.prototype.tinyIncludes = tinyIncludes;

/**
 * https://tc39.es/ecma262/#sec-isunsignedelementtype
 *
 * The abstract operation IsUnsignedElementType verifies if the argument type
 * is an unsigned TypedArray element type.
 *
 * ```markdown
 * 1. If type is one of UINT8, UINT8CLAMPED, UINT16, UINT32, or BIGUINT64, return true.
 * 2. Return false.
 * ```
 *
 * @param {*} type A TypedArray element type.
 * @returns A Boolean.
 */
export function IsUnsignedElementType(type) {
    return [
        'UINT8',
        'UINT8CLAMPED',
        'UINT16',
        'UINT32',
        'BIGUINT64'
    ].tinyIncludes(type);
}
