import { CreateDataPropertyOrThrow } from '../OperationsOnObjects';

/**
 * https://tc39.es/ecma262/#sec-createiterresultobject
 *
 * The abstract operation CreateIteratorResultObject creates an object that
 * conforms to the IteratorResult interface.
 *
 * ```markdown
 * Steps:
 * 1. Let obj be OrdinaryObjectCreate(%Object.prototype%).
 * 2. Perform ! CreateDataPropertyOrThrow(obj, "value", value).
 * 3. Perform ! CreateDataPropertyOrThrow(obj, "done", done).
 * 4. Return obj.
 * ```
 *
 * @param {*} value An ECMAScript language value.
 * @param {*} done A Boolean.
 * @returns An Object that conforms to the IteratorResult interface.
 */
export function CreateIteratorResultObject(value, done) {
    const obj = new Object();

    CreateDataPropertyOrThrow(obj, 'value', value);
    CreateDataPropertyOrThrow(obj, 'done', done);

    return obj;
}
