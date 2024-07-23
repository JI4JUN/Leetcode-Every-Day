module.exports = {
    ToObject,
    LengthOfArrayLike,
    IsCallable,
    ToString,
    HasProperty,
    Get,
    Call,
    F
};

/**
 * The abstract operation ToObject takes argument and returns either a normal
 * completion containing an object or a throw completion.
 *
 * It converts argument to a value of type object according to the following:
 *
 * Undefined --- Throw a TypeError exception.
 *
 * Null --- Throw a TypeError exception.
 *
 * Boolean --- Return a new Boolean object.
 *
 * Number --- Return a new Number object.
 *
 * String --- Return a new String object.
 *
 * Symbol --- Return a new Symbol object.
 *
 * BigInt --- Return a new BigInt object.
 *
 * Object --- Return itself.
 *
 * @param {*} argument ECMAScript language value.
 * @returns A normal completion containing a wrapper object or a throw completion.
 */
function ToObject(argument) {
    if (Object.is(argument, undefined) || Object.is(argument, null)) {
        throw TypeError(
            'Array.prototype.myForEach called on null or undefined'
        );
    }

    return Object(argument);
}

function ToPrimitive(input, preferredType) {
    if (typeof input === 'object' && input !== null) {
        const valueOf = input.valueOf();
        if (typeof valueOf === 'object' && valueOf !== null) {
            const toString = input.toString();
            if (typeof toString === 'object' && toString !== null) {
                throw new TypeError('Cannot convert object to primitive value');
            }
            return toString;
        }
        return valueOf;
    }

    if (preferredType === 'number') {
        return +input;
    }

    return '' + input;
}

function ToIntegerOrInfinity(argument) {
    const number = ToNumber(argument);

    return Number.isNaN(number) ||
        Object.is(number, +0) ||
        Object.is(number, -0)
        ? 0
        : number === Infinity
        ? Infinity
        : number === -Infinity
        ? -Infinity
        : Math.trunc(number);
}

function ToNumber(argument) {
    const typeHandlers = {
        number: (arg) => arg,
        symbo: () => {
            throw new TypeError('Cannot convert a Symbol to a Number');
        },
        bigint: () => {
            throw new TypeError('Cannot convert a BigInt to a Number');
        },
        undefined: () => NaN,
        null: () => +0,
        false: () => +0,
        true: () => 1,
        string: (arg) => parseFloat(arg),
        object: () => ToNumber(ToPrimitive(arg, 'number'))
    };

    const type = typeof argument;
    const handler = typeHandlers[type];

    if (handler) {
        return handler(argument);
    }

    throw new TypeError(`Cannot convert ${type} to a Number`);
}

function ToLength(argument) {
    const len = ToIntegerOrInfinity(argument);

    return len <= 0 ? 0 : Math.min(len, 2 ** 53 - 1);
}

/**
 * The abstract operation LengthOfArrayLike takes argument obj (an Object) and returns either
 * a normal completion containing a non-negative integer or a throw completion. It returns
 * the value of the "length" property of an array-like object.
 *
 * @param {*} obj An Object.
 * @returns A normal completion containing a non-negative integer or a throw completion
 */
function LengthOfArrayLike(obj) {
    const length = ToLength(Get(obj, 'length'));

    if (Number.isNaN(length) || length <= 0) {
        throw new TypeError('Length requires a positive integer');
    }

    return length;
}

function IsCallable(argument) {
    // 如果 argument 不是一个对象，则返回 false
    if (Object.is(typeof argument, 'object') || Object.is(argument, null)) {
        return false;
    }

    // 如果 argument 有一个 [[Call]] 内部方法，则返回 true
    if (
        Object.is(typeof argument, 'function') ||
        Object.is(typeof argument?.call, 'function')
    ) {
        return true;
    }

    // 否则返回 false
    return false;
}

function ToString(argument) {
    if (typeof argument === 'string') {
        return argument;
    } else if (typeof argument === 'symbol') {
        throw new TypeError('Cannot convert a Symbol to a String');
    } else if (typeof argument === 'number') {
        return Number.prototype.toString.call(argument, 10);
    } else if (typeof argument === 'bigint') {
        return BigInt.prototype.toString.call(argument, 10);
    } else if (typeof argument === 'object') {
        const primValue = ToPrimitive(argument, 'string');
        return ToString(primValue);
    } else {
        switch (argument) {
            case undefined:
                return 'undefined';
            case null:
                return 'null';
            case true:
                return 'true';
            case false:
                return 'false';
        }
    }

    throw new TypeError('Cannot convert argument to a String');
}

function HasProperty(O, P) {
    return O.hasOwnProperty(P) ? O.hasOwnProperty(P) : P in O;
}

/**
 * The abstract operation Get takes arguments O (an Object) and P (a property key) and
 * returns either a normal completion containing an ECMAScript language value or
 * a throw completion.
 *
 * @param {*} O An object.
 * @param {*} P A property key.
 * @returns A normal completion containing an ECMAScript language value or a throw completion.
 */
function Get(O, P) {
    if (O.hasOwnProperty(P)) {
        return O[P];
    }

    throw new TypeError(`Property '${P}' of object '${O}' does not exist`);
}

function Call(F, V, argumentsList) {
    if (Object.is(argumentsList, undefined)) {
        argumentsList = [];
    }

    if (IsCallable(F) === false) {
        throw TypeError('F is not callable');
    }

    return F.call(V, ...argumentsList);
}

function F(x) {
    const integerX = Math.trunc(x);
    return Math.max(integerX, 0);
}
