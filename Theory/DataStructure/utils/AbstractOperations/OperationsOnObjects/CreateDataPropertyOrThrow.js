import { CreateDataProperty } from './index';
import { ToString } from '../TypeConversion/index';

export function CreateDataPropertyOrThrow(O, P, V) {
    const success = CreateDataProperty(O, P, V);

    if (success === false) {
        throw new TypeError(
            `Failed to create property ${P} on object ${ToString(O)}`
        );
    }

    return;
}
