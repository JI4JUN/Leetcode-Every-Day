import { mockIncludes } from 'Array';

Array.prototype.mockIncludes = mockIncludes;

/**
 * https://tc39.es/ecma262/#sec-isbigintelementtype
 *
 * The abstract operation IsBigIntElementType verifies if the argument type is a BigInt TypedArray element type.
 *
 * ```markdown
 * Steps:
 * 1. If type is either BIGUINT64 or BIGINT64, return true.
 * 2. Return false.
 * ```
 * @param {*} type A TypedArray element type.
 * @returns A Boolean.
 */
export function IsBigIntElementType(type) {
    return ['BIGUINT64', 'BIGINT64'].mockIncludes(type);
}
