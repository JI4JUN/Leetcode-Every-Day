import { Assert } from 'utils/Assert';

/**
 * https://tc39.es/ecma262/#sec-ecmascript-language-types-number-type
 *
 * This function R checks if the x is a mathematical value.
 *
 * @param {*} x A BigInt or Number.
 * @returns A BigInt or Number.
 */
export function R(x) {
    if (typeof x === 'bigint') {
        return x;
    }

    Assert(typeof x === 'number');

    return x;
}
