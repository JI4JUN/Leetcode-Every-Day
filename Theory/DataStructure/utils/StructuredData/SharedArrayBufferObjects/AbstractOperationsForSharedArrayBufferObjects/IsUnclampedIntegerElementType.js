import { mockIncludes } from 'Array';

Array.prototype.mockIncludes = mockIncludes;

/**
 * https://tc39.es/ecma262/#sec-isunclampedintegerelementtype
 *
 * The abstract operation IsUnclampedIntegerElementType verifies if the argument type
 * is an Integer TypedArray element type not including UINT8CLAMPED.
 *
 * ```markdown
 * Steps:
 * 1. If type is one of INT8, UINT8, INT16, UINT16, INT32, or UINT32, return true.
 * 2. Return false.
 * ```
 *
 * @param {*} type A TypedArray element type.
 * @returns A Boolean.
 */
export function IsUnclampedIntegerElementType(type) {
    return ['INT8', 'UINT8', 'INT16', 'UINT16', 'INT32', 'UINT32'].mockIncludes(
        type
    );
}
