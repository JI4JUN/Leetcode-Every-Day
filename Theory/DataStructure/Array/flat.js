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
} from '../utils/AbstractOperations/index';

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
        if (
            IsCallable(mapperFunction) !== true ||
            thisArg === undefined ||
            depth !== 1
        ) {
            throw new TypeError(
                'mapperFunction must be a function and thisArg must be provided when depth is 1'
            );
        }

        const targetIndex = start;

        let sourceIndex = +0;

        while (sourceIndex < sourceLen) {
            const P = ToString(sourceIndex);
            const exists = HasProperty(O, P);

            if (exists === true) {
                let element = Get(O, P);

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
    }

    return targetIndex;
}
