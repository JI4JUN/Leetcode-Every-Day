import { ToLength } from './index';
import { Get } from '../OperationsOnObjects/index';

/**
 * The abstract operation LengthOfArrayLike takes argument obj (an Object) and returns either
 * a normal completion containing a non-negative integer or a throw completion. It returns
 * the value of the "length" property of an array-like object.
 *
 * Step:
 * 1. Return ℝ(? ToLength(? Get(obj, "length"))).
 *
 * @param {*} obj An Object.
 * @returns A normal completion containing a non-negative integer or a throw completion
 */
export function LengthOfArrayLike(obj) {
    const length = ToLength(Get(obj, 'length'));

    if (Number.isNaN(length) || length <= 0) {
        throw new TypeError('Length requires a positive integer');
    }

    return length;
}
