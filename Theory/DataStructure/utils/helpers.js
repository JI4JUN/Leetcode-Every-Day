export function callable(
    onCalled = (target, _thisArg, args) => Reflect.construct(target, args)
) {
    return function decoartor(classValue, _classContext) {
        return new Proxy(classValue, {
            apply: onCalled
        });
    };
}

export class OutOfRange extends RangeError {
    constructor(fn, detail) {
        super(`${fn}() argument out of range`);

        this.detail = detail;
    }
}
