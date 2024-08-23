/**
 * https://tc39.es/ecma262/#sec-toobject
 *
 * The abstract operation ToObject takes argument and returns either a normal
 * completion containing an object or a throw completion.
 *
 * ```markdown
 * It converts argument to a value of type object according to the following (Argument Type --- Result):
 * Undefined --- Throw a TypeError exception.
 * Null --- Throw a TypeError exception.
 * Boolean --- Return a new Boolean object.
 * Number --- Return a new Number object.
 * String --- Return a new String object.
 * Symbol --- Return a new Symbol object.
 * BigInt --- Return a new BigInt object.
 * Object --- Return itself.
 * ```
 *
 * @param {*} argument ECMAScript language value.
 * @returns A value of type Object.
 */
export function ToObject(argument) {
    if (argument === undefined || argument === null) {
        throw new TypeError(`Cannot convert a ${argument} to a Object`);
    }

    const toCompletion = (thisArg) => {
        Object.defineProperty(thisArg, 'Type', { value: 'normal' });
        Object.defineProperty(thisArg, 'Value', { value: argument });
        Object.defineProperty(thisArg, 'Target', { value: undefined });
    };
    const type = typeof argument;

    if (
        type === 'null' ||
        type === 'boolean' ||
        type === 'number' ||
        type === 'string' ||
        type === 'symbol' ||
        type === 'bigint'
    ) {
        const object = Object(argument);

        toCompletion(object);

        return object;
    } else if (type === 'object') {
        toCompletion(argument);

        return argument;
    }

    throw new TypeError(`Cannot convert a ${argument} to a Object`);
}
