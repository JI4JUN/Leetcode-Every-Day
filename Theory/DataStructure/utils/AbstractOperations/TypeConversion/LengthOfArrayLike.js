import { ToLength } from 'utils/AbstractOperations/TypeConversion';
import {
    Get,
    CreateDataProperty
} from 'utils/AbstractOperations/OperationsOnObjects';

/**
 * https://tc39.es/ecma262/#sec-lengthofarraylike
 *
 * ```markdown
 * The abstract operation LengthOfArrayLike takes argument obj (an Object) and returns either
 * a normal completion containing a non-negative integer or a throw completion. It returns
 * the value of the "length" property of an array-like object.
 *
 * Step:
 * 1. Return ℝ(? ToLength(? Get(obj, "length"))).
 * ```
 *
 * @param {*} obj An Object.
 * @returns The value of the "length" property of an array-like object.
 */
export function LengthOfArrayLike(obj) {
    if (!obj.hasOwnProperty('length') || !('length' in obj)) {
        CreateDataProperty(obj, 'length', 0);
    }

    const length = ToLength(Get(obj, 'length'));

    return length;
}
