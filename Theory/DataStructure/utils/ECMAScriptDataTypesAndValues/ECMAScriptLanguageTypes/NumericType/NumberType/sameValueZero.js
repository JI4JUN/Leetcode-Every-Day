/**
 * ```markdown
 * The abstract operation Number::sameValueZero determines
 * whether or not the two arguments are the same value
 *
 * Steps:
 * 1. If x is NaN and y is NaN, return true.
 * 2. If x is +0𝔽 and y is -0𝔽, return true.
 * 3. If x is -0𝔽 and y is +0𝔽, return true.
 * 4. If x is y, return true.
 * 5. Return false.
 * ```
 *
 * @param {*} x A Number.
 * @param {*} y A Number.
 * @returns A Boolean.
 */
export function sameValueZero(x, y) {
    return (
        (Number.isNaN(x) && Number.isNaN(y)) ||
        (Object.is(x, +0) && Object.is(y, -0)) ||
        (Object.is(x, -0) && Object.is(y, +0)) ||
        x === y
    );
}
