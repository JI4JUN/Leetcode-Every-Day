import { ValidateNonRevokedProxy } from '../../OridinaryAndExoticObjectsBehaviours/';

/**
 * The abstract operation IsArray is used to determine whether argument is an array.
 *
 * ```markdown
 * Steps:
 * 1. If argument is not an Object, return false.
 * 2. If argument is an Array exotic object, return true.
 * 3. If argument is a Proxy exotic object, then
 *     a. Perform ? ValidateNonRevokedProxy(argument).
 *     b. Let proxyTarget be argument.[[ProxyTarget]].
 *     c. Return ? IsArray(proxyTarget).
 * 4. Return false.
 * ```
 *
 * @param {*} argument An ECMAScript language value.
 * @returns A Boolean.
 */
export function IsArray(argument) {
    try {
        if (typeof argument !== 'object' || argument === null) {
            return false;
        }

        if (
            ValidateNonRevokedProxy(argument) === undefined &&
            Object.prototype.toString.call(argument) === '[object Array]'
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }

    return false;
}
