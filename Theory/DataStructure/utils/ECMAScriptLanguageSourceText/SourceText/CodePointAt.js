import { Assert } from 'utils/Assert';
import { mockCharCodeAt } from 'String';
import { isLeadingSurrogate, isTrailingSurrogate } from 'utils/helpers';
import { UTF16SurrogatePairToCodePoint } from './UTF16SurrogatePairToCodePoint';

String.prototype.mockCharCodeAt = mockCharCodeAt;

/**
 * https://tc39.es/ecma262/#sec-codepointat
 *
 * The abstract operation CodePointAt interprets string as a sequence of UTF-16 encoded code points,
 * and reads from it a single code point starting with the code unit at index position.
 *
 * ```markdown
 * 1. Let size be the length of string.
 * 2. Assert: position ≥ 0 and position < size.
 * 3. Let first be the code unit at index position within string.
 * 4. Let cp be the code point whose numeric value is the numeric value of first.
 * 5. If first is neither a leading surrogate nor a trailing surrogate, then
 *     a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: false }.
 * 6. If first is a trailing surrogate or position + 1 = size, then
 *     a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
 * 7. Let second be the code unit at index position + 1 within string.
 * 8. If second is not a trailing surrogate, then
 *     a. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
 * 9. Set cp to UTF16SurrogatePairToCodePoint(first, second).
 * 10. Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 2, [[IsUnpairedSurrogate]]: false }.
 * ```
 * @param {*} string A String.
 * @param {*} position A non-negative integer.
 * @returns A Boolean.
 */
export function CodePointAt(string, position) {
    const size = string.length;

    Assert(position >= 0 && position < size);

    const first = string.mockCharCodeAt(position);

    let cp = first;

    if (!isLeadingSurrogate(first) && !isTrailingSurrogate(first)) {
        return {
            CodePoint: cp,
            CodeUnitCount: 1,
            IsUnpairedSurrogate: false
        };
    }
    if (isTrailingSurrogate(first) || position + 1 === size) {
        return {
            CodePoint: cp,
            CodeUnitCount: 1,
            IsUnpairedSurrogate: true
        };
    }

    const second = string.mockCharCodeAt(position + 1);

    if (!isTrailingSurrogate(second)) {
        return {
            CodePoint: cp,
            CodeUnitCount: 1,
            IsUnpairedSurrogate: true
        };
    }

    cp = UTF16SurrogatePairToCodePoint(first, second);

    return {
        CodePoint: cp,
        CodeUnitCount: 2,
        IsUnpairedSurrogate: false
    };
}
