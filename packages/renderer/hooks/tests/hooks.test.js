const { isHook } = require("../");
const {
    HOOKS_BEFORE_DESTROYED,
    HOOKS_ON_CREATED,
    HOOKS_ON_DESTROYED,
    HOOKS_ON_REF,
    HOOKS_ON_UPDATED,
} = require("../../../constants");

test("is-hook before-destroyed test", () => {
    expect(isHook(HOOKS_BEFORE_DESTROYED, () => {})).toBe(true);
});

test("is-hook on-destroyed test", () => {
    expect(isHook(HOOKS_ON_DESTROYED, () => {})).toBe(true);
});

test("is-hook on-created test", () => {
    expect(isHook(HOOKS_ON_CREATED, () => {})).toBe(true);
});

test("is-hook on-updated test", () => {
    expect(isHook(HOOKS_ON_UPDATED, () => {})).toBe(true);
});

test("is-hook on-ref test", () => {
    expect(isHook(HOOKS_ON_REF, () => {})).toBe(true);
});

test("is-hook number-name test", () => {
    expect(isHook(1, () => {})).toBe(false);
});

test("is-hook number-declaration test", () => {
    expect(isHook(HOOKS_ON_REF, 1)).toBe(false);
});

test("is-hook object-declaration test", () => {
    expect(isHook(HOOKS_ON_REF, {})).toBe(false);
});

test("is-hook string-declaration test", () => {
    expect(isHook(HOOKS_ON_REF, "1")).toBe(false);
});

test("is-hook array-declaration test", () => {
    expect(isHook(HOOKS_ON_REF, [])).toBe(false);
});
