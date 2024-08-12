import { CreateDataProperty } from './CreateDataProperty';
import { ToString } from '../TypeConversion';

/**
 * The abstract operation CreateDataPropertyOrThrow is used to create a new own property of an object.
 *
 * ```markdown
 * Steps:
 * 1. Let success be ? CreateDataProperty(O, P, V).
 * 2. If success is false, throw a TypeError exception.
 * 3. Return UNUSED.
 * ```
 *
 * @param {*} O A Object.
 * @param {*} P A property key.
 * @param {*} V An ECMAScript language value.
 * @returns Either a normal completion containing UNUSED or a throw completion.
 */
export function CreateDataPropertyOrThrow(O, P, V) {
    const success = CreateDataProperty(O, P, V);

    if (success === false) {
        throw new TypeError(
            `Failed to create property ${P} on object ${ToString(O)}`
        );
    }

    return;
}
