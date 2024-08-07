import { IsArray } from '../index';

describe('IsArray function', () => {
    test('Should return true for arrays', () => {
        expect(IsArray([])).toBe(true);
        expect(IsArray([1, 2, 3])).toBe(true);
        expect(IsArray(new Array(5))).toBe(true);
    });

    test('Should return false for non-object types', () => {
        expect(IsArray(null)).toBe(false);
        expect(IsArray(42)).toBe(false);
        expect(IsArray('string')).toBe(false);
        expect(IsArray(undefined)).toBe(false);
        expect(IsArray(true)).toBe(false);
    });

    test('Should return false for ordinary objects', () => {
        expect(IsArray({})).toBe(false);
        expect(IsArray({ key: 'value' })).toBe(false);
        expect(IsArray(new Date())).toBe(false);
    });

    test('Should return false for functions', () => {
        expect(IsArray(function () {})).toBe(false);
        expect(IsArray(() => {})).toBe(false);
    });

    test('Should handle proxies targeting arrays', () => {
        const target = [];
        const handler = {};
        const proxy = new Proxy(target, handler);

        expect(IsArray(proxy)).toBe(true);
    });

    test('Should handle proxies targeting ordinary objects', () => {
        const target = {};
        const handler = {};
        const proxy = new Proxy(target, handler);

        expect(IsArray(proxy)).toBe(false);
    });

    test('Should handle nested proxies with arrays at different levels', () => {
        const target = [];
        const handler = {};
        const outerProxy = new Proxy(target, handler);
        const innerProxy = new Proxy(outerProxy, handler);

        expect(IsArray(innerProxy)).toBe(true);
    });

    test('Should return false for revoked proxies', () => {
        const { proxy, revoke } = Proxy.revocable([], {});
        revoke();

        expect(IsArray(proxy)).toBe(false);
    });

    test('Should handle revoked proxies with nested proxies', () => {
        const { proxy: innerProxy, revoke } = Proxy.revocable([], {});
        const outerProxy = new Proxy(innerProxy, {});
        revoke();

        expect(IsArray(outerProxy)).toBe(false);
    });
});
