import { Assert } from 'utils/Assert';

/**
 * https://tc39.es/ecma262/#sec-ecmascript-language-types-number-type
 *
 * This function F checks if the x is a Number.
 *
 * @param {*} x A Number.
 * @returns A Number.
 */
export function F(x) {
    Assert(typeof x === 'number');

    return x;
}
