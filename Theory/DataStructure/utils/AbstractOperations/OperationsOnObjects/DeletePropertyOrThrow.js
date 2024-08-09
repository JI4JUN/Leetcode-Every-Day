import { ToString } from '../TypeConversion';

/**
 * ```markdown
 * The abstract operation DeletePropertyOrThrow is used to remove a specific own property of an object.
 *
 * Steps:
 * 1. Let success be ? O.[[Delete]](P).
 * 2. If success is false, throw a TypeError exception.
 * 3. Return UNUSED.
 * ```
 *
 * @param {*} O An Object.
 * @param {*} P A property key.
 * @returns Either a normal completion containing UNUSED or a throw completion.
 */
export function DeletePropertyOrThrow(O, P) {
    const success = delete O[P];

    if (success === false) {
        throw new TypeError(
            `Failed to delete property ${P} on object ${ToString(O)}`
        );
    }

    return undefined;
}
