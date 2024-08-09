import { sameValueZero } from '../../ECMAScriptDataTypesAndValues';
import { SameValueNonNumber } from './SameValueNonNumber';

/**
 * ```markdown
 * The abstract operation SameValueZero determines whether or not the two arguments are
 * the same value (ignoring the difference between +0𝔽 and -0𝔽).
 *
 * Steps:
 * 1. If Type(x) is not Type(y), return false.
 * 2. If x is a Number, then
 *     a. Return Number::sameValueZero(x, y).
 * 3. Return SameValueNonNumber(x, y).
 *
 * ```
 * @param {*} x An ECMAScript language value.
 * @param {*} y An ECMAScript language value.
 * @returns A Boolean.
 */
export function SameValueZero(x, y) {
    if (typeof x !== typeof y) {
        return false;
    }

    if (typeof x === 'number') {
        return sameValueZero(x, y);
    }

    return SameValueNonNumber(x, y);
}
