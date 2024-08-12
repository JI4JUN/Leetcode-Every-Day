/**
 * The abstract operation Number::equal determines whether two numbers are equal.
 *
 * ```markdown
 * Steps:
 * 1. If x is NaN, return false.
 * 2. If y is NaN, return false.
 * 3. If x is y, return true.
 * 4. If x is +0𝔽 and y is -0𝔽, return true.
 * 5. If x is -0𝔽 and y is +0𝔽, return true.
 * 6. Return false.
 * ```
 *
 * @param {*} x A Number.
 * @param {*} y A Number.
 * @returns A Boolean.
 */
export function equal(x, y) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return false;
    }

    if (
        x === y ||
        (Object.is(x, +0) && Object.is(y, -0)) ||
        (Object.is(x, -0) && Object.is(y, +0))
    ) {
        return true;
    }

    return false;
}
