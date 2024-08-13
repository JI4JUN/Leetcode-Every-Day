import { ToIntegerOrInfinity } from './ToIntegerOrInfinity';

/**
 * https://tc39.es/ecma262/#sec-tolength
 *
 * ```markdown
 * The abstract operation ToLength clamps and truncates argument to an integer Number
 * suitable for use as the length of an array-like object.
 *
 * Steps:
 * 1. Let len be ? ToIntegerOrInfinity(argument).
 * 2. If len ≤ 0, return +0𝔽.
 * 3. Return 𝔽(min(len, 2**53 - 1)).
 * ```
 *
 * @param {*} argument An ECMAScript language value.
 * @returns An integral Number suitable for use as the length of an array-like object.
 */
export function ToLength(argument) {
    const len = ToIntegerOrInfinity(argument);

    return len <= 0 ? +0 : Math.min(len, Number.MAX_SAFE_INTEGER);
}
