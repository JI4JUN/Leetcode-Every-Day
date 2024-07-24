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
