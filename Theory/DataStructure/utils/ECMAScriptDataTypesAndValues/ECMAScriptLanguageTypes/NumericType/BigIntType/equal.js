/**
 * The abstract operation determines whether the given two BigInt values are equal.
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
    return x === y;
}
