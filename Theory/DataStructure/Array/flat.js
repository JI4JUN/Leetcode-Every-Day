import {
    HasProperty,
    IsCallable,
    LengthOfArrayLike,
    ToIntegerOrInfinity,
    ToObject,
    Get,
    ToString,
    Call,
    IsArray,
    CreateDataPropertyOrThrow
} from '../utils/AbstractOperations';

/**
 * ```markdown
 * Array.prototype.flat([depth])
 *
 * Steps:
 * 1. Let O be ? ToObject(this value).
 * 2. Let sourceLen be ? LengthOfArrayLike(O).
 * 3. Let depthNum be 1.
 * 4. If depth is not undefined, then
 *     a. Set depthNum to ? ToIntegerOrInfinity(depth).
 *     b. If depthNum < 0, set depthNum to 0.
 * 5. Let A be ? ArraySpeciesCreate(O, 0).
 * 6. Perform ? FlattenIntoArray(A, O, sourceLen, 0, depthNum).
 * 7. Return A.
 * ```
 *
 * https://tc39.es/ecma262/#sec-array.prototype.flat
 */
export function tinyFlat(depth) {
    const O = ToObject(this);
    const sourceLen = LengthOfArrayLike(O);

    let depthNum = 1;

    if (depth !== undefined) {
        depthNum = ToIntegerOrInfinity(depth);

        if (depthNum < 0) {
            depthNum = 0;
        }
    }

    const A = new Array();

    FlattenIntoArray(A, O, sourceLen, 0, depthNum);

    return A;
}

/**
 * ```markdown
 * The abstract operation FlattenIntoArray is used to flatten the given array.
 *
 * Steps:
 * 1. Assert: If mapperFunction is present, then IsCallable(mapperFunction) is true, thisArg is present, and depth is 1.
 * 2. Let targetIndex be start.
 * 3. Let sourceIndex be +0𝔽.
 * 4. Repeat, while ℝ(sourceIndex) < sourceLen,
 *     a. Let P be ! ToString(sourceIndex).
 *     b. Let exists be ? HasProperty(source, P).
 *     c. If exists is true, then
 *         i. Let element be ? Get(source, P).
 *         ii. If mapperFunction is present, then
 *             1. Set element to ? Call(mapperFunction, thisArg, « element, sourceIndex, source »).
 *         iii. Let shouldFlatten be false.
 *         iv. If depth > 0, then
 *             1. Set shouldFlatten to ? IsArray(element).
 *         v. If shouldFlatten is true, then
 *             1. If depth = +∞, let newDepth be +∞.
 *             2. Else, let newDepth be depth - 1.
 *             3. Let elementLen be ? LengthOfArrayLike(element).
 *             4. Set targetIndex to ? FlattenIntoArray(target, element, elementLen, targetIndex, newDepth).
 *         vi. Else,
 *             1. If targetIndex ≥ 2**53 - 1, throw a TypeError exception.
 *             2. Perform ? CreateDataPropertyOrThrow(target, ! ToString(𝔽(targetIndex)), element).
 *             3. Set targetIndex to targetIndex + 1.
 *     d. Set sourceIndex to sourceIndex + 1𝔽.
 * 5. Return targetIndex.
 * ```
 *
 * @param {*} target An Object.
 * @param {*} source An Object.
 * @param {*} sourceLen A non-negative integer.
 * @param {*} start A non-negative integer.
 * @param {*} depth A non-negative integer or +∞.
 * @param {*} mapperFunction A function object.
 * @param {*} thisArg An ECMAScript language value.
 * @returns Either a normal completion containing a non-negative integer or a throw completion.
 */
export function FlattenIntoArray(
    target,
    source,
    sourceLen,
    start,
    depth,
    mapperFunction,
    thisArg
) {
    if (mapperFunction !== undefined) {
        if (IsCallable(mapperFunction) !== true || depth !== 1) {
            throw new TypeError(
                'mapperFunction must be a function and depth must be 1'
            );
        }
    }

    let targetIndex = start;
    let sourceIndex = +0;

    while (sourceIndex < sourceLen) {
        const P = ToString(sourceIndex);
        const exists = HasProperty(source, P);

        if (exists === true) {
            let element = Get(source, P);

            if (mapperFunction !== undefined) {
                element = Call(mapperFunction, thisArg, [
                    element,
                    sourceIndex,
                    source
                ]);
            }

            let shouldFlatten = false;

            if (depth > 0) {
                shouldFlatten = IsArray(element);
            }

            let newDepth;

            if (shouldFlatten === true) {
                if (depth === +Infinity) {
                    newDepth = +Infinity;
                } else {
                    newDepth = depth - 1;
                }

                const elementLen = LengthOfArrayLike(element);

                targetIndex = FlattenIntoArray(
                    target,
                    element,
                    elementLen,
                    targetIndex,
                    newDepth
                );
            } else {
                if (targetIndex >= 2 ** 53 - 1) {
                    throw new TypeError(
                        'The target array length must not exceed 2^53 - 1'
                    );
                }

                CreateDataPropertyOrThrow(
                    target,
                    ToString(targetIndex),
                    element
                );

                targetIndex++;
            }
        }

        sourceIndex++;
    }

    return targetIndex;
}
