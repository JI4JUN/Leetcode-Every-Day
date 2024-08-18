/**
 * https://tc39.es/ecma262/#sec-numeric-types-bigint-lessThan
 *
 * The abstract operation BigInt::lessThan determines whether a BigInteger x is less than another BigInteger y.
 *
 * ```markdown
 * Steps:
 * 1. If ℝ(x) < ℝ(y), return true; otherwise return false.
 * ```
 *
 * @param {*} x A BigInt.
 * @param {*} y A BigInt.
 * @returns A Boolean.
 */
export function lessThan(x, y) {
    return x < y;
}
