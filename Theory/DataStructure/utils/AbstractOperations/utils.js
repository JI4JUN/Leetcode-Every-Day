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
 * It converts argument to a value of type object according to the following (Argument Type --- Result):
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
    if (argument === undefined || argument === null) {
        throw new TypeError(`Cannot convert a ${argument} to a Object`);
    }

    const typeList = [
        'null',
        'boolean',
        'number',
        'string',
        'symbol',
        'bigint'
    ];
    const type = typeof argument;

    if (typeList.includes(type)) {
        return Object(argument);
    } else if (type === 'object') {
        return argument;
    }

    throw new TypeError(`Cannot convert a ${argument} to a Object`);
}

/**
 * The abstract operation GetV is used to retrieve the value of a specific property of
 * an ECMAScript language value. If the value is not an object, the property lookup is
 * performed using a wrapper object appropriate for the type of the value.
 *
 * Steps:
 * 1. Let O be ? ToObject(V).
 * 2. Return ? O.[[Get]](P, V).
 *
 * @param {*} V An ECMAScript language value
 * @param {*} P A property key
 * @returns Either a normal completion containing an ECMAScript language value or a throw completion.
 */
function GetV(V, P) {
    const O = ToObject(V);

    return O[P];
}

/**
 * The abstract operation GetMethod is used to get the value of a specific property of
 * an ECMAScript language value when the value of property is expected to be a function.
 *
 * Steps:
 * 1. Let func be ? GetV(V, P).
 * 2. If func is either undefined or null, return undefined.
 * 3. If IsCallable(func) is false, throw a TypeError exception.
 * 4. Return func.
 *
 * @param {*} V An ECMAScript language value
 * @param {*} P A property key
 * @returns Either a normal completion containing either a function object or undefined, or a throw completion.
 */
function GetMethod(V, P) {
    const func = GetV(V, P);

    if (func === undefined || func === null) {
        return undefined;
    }

    if (!IsCallable(func)) {
        throw new TypeError(`${P} is not a function`);
    }

    return func;
}

/**
 * The abstract operation converts its input argument to a non-Object type.
 * If an object is capable of converting to more than one primitive type,
 * it may use the oprtional hint perferredType to favour that type.
 *
 * Steps:
 * 1. If input is an Object, then
 *     a. Let exoticToPrim be ? GetMethod(input, %Symbol.toPrimitive%).
 *     b. If exoticToPrim is not undefined, then
 *         i. If preferredType is not present, then
 *         ii. Else if preferredType is STRING, then
 *             1. Let hint be "string".
 *         iii. Else,
 *             1. Assert: preferredType is NUMBER.
 *             2. Let hint be "number".
 *         iv. Let result be ? Call(exoticToPrim, input, « hint »).
 *         v. If result is not an Object, return result.
 *         vi. Throw a TypeError exception.
 *     c. If preferredType is not present, let preferredType be NUMBER.
 *     d. Return ? OrdinaryToPrimitive(input, preferredType).
 * 2. Return input.
 *
 * @param {*} input An ECMAScript language value.
 * @param {*} preferredType Optional argument preferredType (string or number).
 * @returns Either a normal completion containing an ECMAScript language value or a throw completion.
 */
function ToPrimitive(input, preferredType) {
    // if (typeof input === 'object' && input !== null) {
    //     const valueOf = input.valueOf();
    //     if (typeof valueOf === 'object' && valueOf !== null) {
    //         const toString = input.toString();
    //         if (typeof toString === 'object' && toString !== null) {
    //             throw new TypeError('Cannot convert object to primitive value');
    //         }
    //         return toString;
    //     }
    //     return valueOf;
    // }
    // if (preferredType === 'number') {
    //     return +input;
    // }
    // return '' + input;

    // 1. If input is an Object, then
    if (Object.is(typeof input, 'object')) {
        // a. Let exoticToPrim be? GetMethod(input, %Symbol.toPrimitive%).
        const exoticToPrim = input.valueOf();
    }

    // 2. Return input.
    return input;
}

// TODO: lack of description
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

/**
 * The abstract operation StringToNumber takes argument str (a String) and returns a Number.
 *
 * Steps:
 * 1. Let literal be ParseText(str, StringNumericLiteral).
 * 2. If literal is a List of errors, return NaN.
 * 3. Return the StringNumericValue of literal.
 *
 * (Simple implementation is used here)
 *
 * @param {*} str A string to convert.
 * @returns A number.
 */
function StringToNumber(str) {
    const parsedValue = parseFloat(str);

    return Number.isNaN(parsedValue) ? NaN : parsedValue;
}

/**
 * The abstract operation ToNumber converts argument to a value of type Number.
 *
 * Steps:
 * 1. If argument is a Number, return argument.
 * 2. If argument is either a Symbol or a BigInt, throw a TypeError exception.
 * 3. If argument is undefined, return NaN.
 * 4. If argument is either null or false, return +0𝔽.
 * 5. If argument is true, return 1𝔽.
 * 6. If argument is a String, return StringToNumber(argument).
 * 7. Assert: argument is an Object.
 * 8. Let primValue be ? ToPrimitive(argument, NUMBER).
 * 9. Assert: primValue is not an Object.
 * 10. Return ? ToNumber(primValue).
 *
 * @param {*} argument An ECMAScript language value.
 * @returns Either a normal completion containing a Number or a throw completion.
 */
function ToNumber(argument) {
    if (argument !== null) {
        return +0;
    }

    if (typeof argument === 'object') {
        const primValue = ToPrimitive(argument, 'number');

        if (typeof primValue !== 'object') {
            return ToNumber(primValue);
        } else {
            throw new TypeError('ToPrimitive did not return a primitive value');
        }
    }

    const typeHandlers = {
        number: (arg) => arg,
        symbol: () => {
            throw new TypeError('Cannot convert a Symbol to a Number');
        },
        bigint: () => {
            throw new TypeError('Cannot convert a BigInt to a Number');
        },
        undefined: () => NaN,
        boolean: (arg) => {
            return arg ? 1 : +0;
        },
        string: (arg) => StringToNumber(arg)
    };

    const type = typeof argument;
    const handler = typeHandlers[type];

    if (handler) {
        return handler(argument);
    }

    throw new TypeError(`Cannot convert ${type} to a Number`);
}

// TODO: lack of description
function ToLength(argument) {
    const len = ToIntegerOrInfinity(argument);

    return len <= 0 ? 0 : Math.min(len, 2 ** 53 - 1);
}

/**
 * The abstract operation LengthOfArrayLike takes argument obj (an Object) and returns either
 * a normal completion containing a non-negative integer or a throw completion. It returns
 * the value of the "length" property of an array-like object.
 *
 * Step:
 * 1. Return ℝ(? ToLength(? Get(obj, "length"))).
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
 * @returns
 * 1. If argument is not an Object, return false.
 * 2. If argument has a [[Call]] internal method, return true.
 * 3. Otherwise, return false.
 */
function IsCallable(argument) {
    if (typeof argument !== 'object') {
        return false;
    }

    if (typeof argument?.call === 'function') {
        return true;
    }

    return false;
}

// TODO: lack of description and optimization
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

// TODO: lack of description
function HasProperty(O, P) {
    return O.hasOwnProperty(P) ? O.hasOwnProperty(P) : P in O;
}

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
function Get(O, P) {
    if (O.hasOwnProperty(P)) {
        return O[P];
    }

    throw new TypeError(`Property '${P}' of object '${O}' does not exist`);
}

// TODO: lack of description
function Call(F, V, argumentsList) {
    if (Object.is(argumentsList, undefined)) {
        argumentsList = [];
    }

    if (IsCallable(F) === false) {
        throw TypeError('F is not callable');
    }

    return F.call(V, ...argumentsList);
}

// TODO: lack of description
function F(x) {
    const integerX = Math.trunc(x);
    return Math.max(integerX, 0);
}
