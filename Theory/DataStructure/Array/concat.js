import { Get, ToBoolean, ToObject } from '../utils/AbstractOperations/index';

export function tinyConcat(...items) {
    const O = ToObject(this);
    const A = new Array();

    let n = 0;

    items = [O, ...items];

    for (const E of items) {
    }
}

export function IsConcatSpreadable(O) {
    if (typeof O !== 'object') {
        return false;
    }

    const spreadable = Get(O, Symbol.isConcatSpreadable);

    if (spreadable !== undefined) {
        return ToBoolean(spreadable);
    }

    return IsArray(O);
}
