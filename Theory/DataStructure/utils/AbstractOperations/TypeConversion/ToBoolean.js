/**
 * https://tc39.es/ecma262/#sec-toboolean
 *
 * ```markdown
 * The abstract operation ToBoolean converts argument to a value of type Boolean.
 *
 * Steps:
 * 1. If argument is a Boolean, return argument.
 * 2. If argument is one of undefined, null, +0𝔽, -0𝔽, NaN, 0ℤ, or the empty String, return false.
 * 3. NOTE: This step is replaced in section B.3.6.1.
 * 4. Return true.
 * ```
 *
 * @param {*} argument An ECMAScript language value.
 * @returns A value of type Boolean.
 */
export function ToBoolean(argument) {
    if (typeof argument === 'boolean') {
        return argument;
    }

    if (
        argument === undefined ||
        argument === null ||
        Object.is(argument, +0) ||
        Object.is(argument, -0) ||
        Number.isNaN(argument) ||
        argument === 0 ||
        argument === ''
    ) {
        return false;
    }

    return true;
}
