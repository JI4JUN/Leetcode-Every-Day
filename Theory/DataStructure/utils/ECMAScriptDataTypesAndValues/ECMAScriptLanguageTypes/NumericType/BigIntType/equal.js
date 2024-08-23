import { R } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-numeric-types-bigint-equal
 *
 * The abstract operation BigInt::equal determines whether the given two BigInt values are equal.
 *
 * ```markdown
 * Steps:
 * 1. If ℝ(x) = ℝ(y), return true; otherwise return false.
 * ```
 *
 * @param {*} x A BigInt.
 * @param {*} y A BigInt.
 * @returns A Boolean.
 */
export function equal(x, y) {
    return R(x) === R(y);
}
