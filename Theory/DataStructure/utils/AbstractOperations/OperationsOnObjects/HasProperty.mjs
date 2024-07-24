/**
 * Steps:
 * 1. Let desc be ? O.[[GetOwnProperty]](P).
 * 2. If desc is undefined, return false.
 * 3. Return true.
 *
 * @param {*} O
 * @param {*} P
 * @returns
 */
export function HasProperty(O, P) {
    return O.hasOwnProperty(P) ? O.hasOwnProperty(P) : P in O;
}
