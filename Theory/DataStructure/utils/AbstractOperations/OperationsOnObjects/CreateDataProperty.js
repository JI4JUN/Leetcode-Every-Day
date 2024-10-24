/**
 * https://tc39.es/ecma262/#sec-createdataproperty
 *
 * The abstract operation CreateDataProperty is used to create a new own property of an object.
 *
 * ```markdown
 * Steps:
 * 1. Let newDesc be the PropertyDescriptor { [[Value]]: V, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }.
 * 2. Return ? O.[[DefineOwnProperty]](P, newDesc).
 * ```
 *
 * @param {*} O A Object.
 * @param {*} P A property key.
 * @param {*} V An ECMAScript language value.
 * @returns A Boolean.
 */
export function CreateDataProperty(O, P, V) {
    const newDesc = {
        value: V,
        writable: true,
        enumerable: true,
        configurable: true
    };

    try {
        Object.defineProperty(O, P, newDesc);

        return true;
    } catch (e) {
        return false;
    }
}
