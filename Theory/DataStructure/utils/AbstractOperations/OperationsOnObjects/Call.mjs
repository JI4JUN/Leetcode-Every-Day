// TODO: lack of description
export function Call(F, V, argumentsList) {
    if (Object.is(argumentsList, undefined)) {
        argumentsList = [];
    }

    if (IsCallable(F) === false) {
        throw TypeError('F is not callable');
    }

    return F.call(V, ...argumentsList);
}
