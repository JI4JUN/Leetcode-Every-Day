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

function ToObject(argument) {
    if (Object.is(argument, undefined) || Object.is(argument, null)) {
        throw TypeError(
            'Array.prototype.myForEach called on null or undefined'
        );
    } // 排除 undefined 和 null

    return Object(argument);
}

function LengthOfArrayLike(obj) {
    const length = Number(obj.length);

    if (Number.isNaN(length) || length <= 0) {
        throw TypeError('Length requires a positive integer');
    } // 保证长度为非负整数

    return Math.floor(length);
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
    }

    if (typeof argument === 'symbol') {
        throw new TypeError('Cannot convert a Symbol to a String');
    }

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

    if (typeof argument === 'number') {
        return Number.prototype.toString.call(argument, 10);
    }

    if (typeof argument === 'bigint') {
        return BigInt.prototype.toString.call(argument, 10);
    }

    function ToPrimitive(input, preferredType) {
        if (typeof input === 'object' && input !== null) {
            const valueOf = input.valueOf();
            if (typeof valueOf === 'object' && valueOf !== null) {
                const toString = input.toString();
                if (typeof toString === 'object' && toString !== null) {
                    throw new TypeError(
                        'Cannot convert object to primitive value'
                    );
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

    if (typeof argument === 'object') {
        const primValue = ToPrimitive(argument, 'string');
        return ToString(primValue);
    }

    throw new TypeError('Cannot convert argument to a String');
}

function HasProperty(O, P) {
    return O.hasOwnProperty(P) ? O.hasOwnProperty(P) : P in O;
}

function Get(O, P) {
    return O[P];
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
