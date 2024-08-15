import { ValidateNonRevokedProxy } from '../ValidateNonRevokedProxy';

describe('ValidateNonRevokedProxy function', () => {
    test('Should return "UNUSED" for a normal proxy', () => {
        const target = {};
        const handler = {};
        const proxy = new Proxy(target, handler);

        expect(ValidateNonRevokedProxy(proxy)).toBeUndefined();
    });

    test('Should throw TypeError for a revoked proxy', () => {
        const { proxy, revoke } = Proxy.revocable({}, {});

        revoke();

        expect(() => ValidateNonRevokedProxy(proxy)).toThrow(TypeError);
        expect(() => ValidateNonRevokedProxy(proxy)).toThrow(
            'Proxy has been revoked'
        );
    });

    test('Should throw TypeError for a revoked proxy with a custom handler', () => {
        const target = {};
        const handler = {
            get: (obj, prop) => (prop in obj ? obj[prop] : 'default')
        };
        const { proxy, revoke } = Proxy.revocable(target, handler);

        revoke();

        expect(() => ValidateNonRevokedProxy(proxy)).toThrow(TypeError);
        expect(() => ValidateNonRevokedProxy(proxy)).toThrow(
            'Proxy has been revoked'
        );
    });

    test('Should return "UNUSED" for a proxy that has another proxy as target', () => {
        const target = {};
        const handler = {};
        const innerProxy = new Proxy(target, handler);
        const outerProxy = new Proxy(innerProxy, handler);

        expect(ValidateNonRevokedProxy(outerProxy)).toBeUndefined();
    });
});
