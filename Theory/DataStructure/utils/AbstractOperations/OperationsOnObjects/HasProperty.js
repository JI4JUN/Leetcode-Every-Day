/**
 * The abstract opertaion HasProperty is used to determine whether an object
 * has a property with the specified key.
 *
 * Steps:
 * 1. Return ? O.[[HasProperty]](P).
 *
 * @param {*} O A Object.
 * @param {*} P A property key.
 * @returns A Boolean.
 */
export function HasProperty(O, P) {
    if (typeof O !== 'object' || O === null) {
        throw new TypeError('Object required');
    }

    return O.hasOwnProperty(P) || P in O;
}
