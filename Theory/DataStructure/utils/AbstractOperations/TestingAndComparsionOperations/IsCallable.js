/**
 * The abstract operation IsCallable is used to determine whether argument is a callable
 * function with a [[Call]] internal method.
 *
 * Steps:
 * 1. If argument is not an Object, return false.
 * 2. If argument has a [[Call]] internal method, return true.
 * 3. Return false.
 *
 * @param {*} argument An ECMAScript language value
 * @returns A Boolean
 */
export function IsCallable(argument) {
    if (typeof argument !== 'object' && typeof argument !== 'function') {
        return false;
    }

    if (typeof argument?.call === 'function') {
        return true;
    }

    return false;
}
