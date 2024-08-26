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

export const isLeadingSurrogate = (cp) => cp >= 0xd800 && cp <= 0xdbff;
export const isTrailingSurrogate = (cp) => cp >= 0xdc00 && cp <= 0xdfff;
