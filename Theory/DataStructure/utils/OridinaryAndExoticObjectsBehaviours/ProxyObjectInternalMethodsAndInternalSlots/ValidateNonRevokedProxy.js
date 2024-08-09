/**
 * ```markdown
 * The abstract operation ValidateNonRevokedProxy throws a TypeError exception if proxy has been revoked.
 *
 * Steps:
 * 1. If proxy.[[ProxyTarget]] is null, throw a TypeError exception.
 * 2. Assert: proxy.[[ProxyHandler]] is not null.
 * 3. Return UNUSED.
 * ```
 *
 * @param {*} proxy A Proxy exotic object.
 * @returns Either a normal completion containing UNUSED or a throw completion.
 */
export function ValidateNonRevokedProxy(proxy) {
    try {
        proxy.__proto__;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new TypeError('Proxy has been revoked');
        } else {
            throw error;
        }
    }

    return undefined;
}
