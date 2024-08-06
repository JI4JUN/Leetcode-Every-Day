/**
 * The abstract operation Set is used to set the value of a specific property of an object.
 *
 * Steps:
 * 1. Let success be ? O.[[Set]](P, V, O).
 * 2. If success is false and Throw is true, throw a TypeError exception.
 * 3. Return UNUSED.
 *
 * @param {*} O An Object
 * @param {*} P A property key
 * @param {*} V The new value for the property.
 * @param {*} Throw A Boolean
 * @returns Either a normal completion containing UNUSED or a throw completion
 */
export function Set(O, P, V, Throw) {
    try {
        O[P] = V;

        return undefined;
    } catch (e) {
        if (Throw) {
            throw new TypeError('Cannot set property');
        }
    }
}
