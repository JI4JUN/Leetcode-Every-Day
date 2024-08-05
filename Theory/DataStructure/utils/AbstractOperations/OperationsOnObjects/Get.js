/**
 * The abstract operation Get takes arguments O (an Object) and P (a property key) and
 * returns either a normal completion containing an ECMAScript language value or
 * a throw completion.
 *
 * Step:
 * 1. Return ? O.[[Get]](P, O).
 *
 * @param {*} O An object.
 * @param {*} P A property key.
 * @returns A normal completion containing an ECMAScript language value or a throw completion.
 */
export function Get(O, P) {
    if (O.hasOwnProperty(P) || P in O || O.hasOwnProperty('length')) {
        return O[P];
    }

    throw new TypeError(`Property '${P}' of object '${O}' does not exist`);
}
