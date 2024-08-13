import { ToNumber } from './ToNumber';

/**
 * https://tc39.es/ecma262/#sec-tointegerorinfinity
 *
 * ```markdown
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
 * ```
 *
 * @param {*} argument An ECMAScript language value.
 * @returns An integer representing its Number value with fractional part truncated, or to +∞ or -∞ when that Number value is infinite.
 */
export function ToIntegerOrInfinity(argument) {
    const number = ToNumber(argument);

    if (
        Number.isNaN(number) ||
        Object.is(number, +0) ||
        Object.is(number, -0)
    ) {
        return 0;
    } else if (number >= Number.POSITIVE_INFINITY) {
        return Infinity;
    } else if (number <= Number.NEGATIVE_INFINITY) {
        return -Infinity;
    }

    return Math.trunc(number);
}
