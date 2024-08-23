import { Assert } from 'utils/Assert';

/**
 * https://tc39.es/ecma262/#sec-ecmascript-language-types-number-type
 *
 * This function Z checks if the x is a BigInt.
 *
 * @param {*} x A BigInt.
 * @returns A BigInt.
 */
export function Z(x) {
    Assert(typeof x === 'bigint');

    return x;
}
