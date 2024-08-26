import { Assert } from 'utils/Assert';
import { isLeadingSurrogate, isTrailingSurrogate } from 'utils/helpers';

/**
 * https://tc39.es/ecma262/#sec-utf16decodesurrogatepair
 *
 * The abstract operation UTF16SurrogatePairToCodePoint converts to a code point from a UTF-16 surrogate pair.
 *
 * ```markdown
 * 1. Assert: lead is a leading surrogate and trail is a trailing surrogate.
 * 2. Let cp be (lead - 0xD800) × 0x400 + (trail - 0xDC00) + 0x10000.
 * 3. Return the code point cp.
 * ```
 *
 * @param {*} lead A code unit.
 * @param {*} trail A code unit.
 * @returns A code point.
 */
export function UTF16SurrogatePairToCodePoint(lead, trail) {
    Assert(isLeadingSurrogate(lead) && isTrailingSurrogate(trail));

    const cp = (lead - 0xd800) * 0x400 + (trail - 0xdc00) + 0x10000;

    return cp;
}
