// TODO: lack of description
export function ToLength(argument) {
    const len = ToIntegerOrInfinity(argument);

    return len <= 0 ? 0 : Math.min(len, 2 ** 53 - 1);
}
