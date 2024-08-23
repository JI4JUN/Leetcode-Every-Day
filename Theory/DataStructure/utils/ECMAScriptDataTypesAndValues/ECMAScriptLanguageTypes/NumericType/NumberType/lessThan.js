import { Assert } from 'utils/Assert';
import { R } from 'utils/NotationalConventions/AlgorithmConventions/MathematicalOperations';

/**
 * https://tc39.es/ecma262/#sec-numeric-types-number-lessThan
 *
 * The abstract operation Number::lessThan determines whether a Number value x is less than another Number value y.
 *
 * ```markdown
 * Steps:
 * 1. If x is NaN, return undefined.
 * 2. If y is NaN, return undefined.
 * 3. If x is y, return false.
 * 4. If x is +0𝔽 and y is -0𝔽, return false.
 * 5. If x is -0𝔽 and y is +0𝔽, return false.
 * 6. If x is +∞𝔽, return false.
 * 7. If y is +∞𝔽, return true.
 * 8. If y is -∞𝔽, return false.
 * 9. If x is -∞𝔽, return true.
 * 10. Assert: x and y are finite.
 * 11. If ℝ(x) < ℝ(y), return true. Otherwise, return false.
 * ```
 *
 * @param {*} x A Number.
 * @param {*} y A Number.
 * @returns A Boolean.
 */
export function lessThan(x, y) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return undefined;
    }

    if (
        x === y ||
        (x === +0 && y === -0) ||
        (x === -0 && y === +0) ||
        x === +Infinity ||
        y === -Infinity
    ) {
        return false;
    }

    if (y === +Infinity || x === -Infinity) {
        return true;
    }

    Assert(
        (x !== +Infinity || x !== -Infinity) &&
            (y !== +Infinity || y !== -Infinity)
    );

    return R(x) < R(y);
}
