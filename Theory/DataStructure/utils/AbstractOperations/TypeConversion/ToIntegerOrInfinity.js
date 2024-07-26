import { ToNumber } from './index';

/**
 * The abstract operation ToIntegerOrInfinity converts argument to an integer representing
 * its Number value with fractional part truncated, or to +∞ or -∞ when that Number value
 * is infinite.
 *
 * Steps:
 * 1. Let number be ? ToNumber(argument).
 * 2. If number is one of NaN, +0𝔽, or -0𝔽, return 0.
 * 3. If number is +∞𝔽, return +∞.
 * 4. If number is -∞𝔽, return -∞.
 * 5. Return truncate(ℝ(number)).
 *
 * @param {*} argument An ECMAScript language value
 * @returns Either a normal completion containing either an integer, +∞, or -∞, or a throw completion
 */
export function ToIntegerOrInfinity(argument) {
    const number = ToNumber(argument);

    if (
        Number.isNaN(number) ||
        Object.is(number, +0) ||
        Object.is(number, -0)
    ) {
        return 0;
    } else if (number === Infinity) {
        return Infinity;
    } else if (number === -Infinity) {
        return -Infinity;
    }

    return Math.trunc(number);
}
