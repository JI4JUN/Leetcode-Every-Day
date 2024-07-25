import { ToIntegerOrInfinity } from './index';

/**
 * The abstract operation ToLength clamps and truncates argument to an integer Number
 * suitable for use as the length of an array-like object.
 *
 * Steps:
 * 1. Let len be ? ToIntegerOrInfinity(argument).
 * 2. If len ≤ 0, return +0𝔽.
 * 3. Return 𝔽(min(len, 2**53 - 1)).
 *
 * @param {*} argument An ECMAScript language value.
 * @returns Either a normal completion containing an integral Number or a throw completion.
 */
export function ToLength(argument) {
    const len = ToIntegerOrInfinity(argument);

    return len <= 0 ? +0 : Math.min(len, 2 ** 53 - 1);
}
