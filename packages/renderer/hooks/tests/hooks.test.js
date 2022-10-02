const { isHook } = require("../");
const {
    HOOKS_BEFORE_DESTROYED,
    HOOKS_ON_CREATED,
    HOOKS_ON_DESTROYED,
    HOOKS_ON_REF,
    HOOKS_ON_UPDATED,
    HOOKS_BEFORE_PREPARED,
    HOOKS_ON_PREPARED,
} = require("../../../constants");

test.each([
    [HOOKS_BEFORE_DESTROYED],
    [HOOKS_ON_CREATED],
    [HOOKS_ON_DESTROYED],
    [HOOKS_ON_REF],
    [HOOKS_ON_UPDATED],
    [HOOKS_BEFORE_PREPARED],
    [HOOKS_ON_PREPARED],
])("should accept hook '%s'", (hook) => {
    expect(isHook(hook, () => {})).toBeTruthy();
});

test.each([
    [HOOKS_BEFORE_DESTROYED, 1],
    [HOOKS_ON_CREATED, ""],
    [HOOKS_ON_DESTROYED, {}],
    [HOOKS_ON_REF, []],
    [HOOKS_ON_UPDATED, null],
    [HOOKS_BEFORE_PREPARED, undefined],
    [HOOKS_ON_PREPARED, "hook"],
    ["onClicked", () => {}],
])("should refuse invalid hooks '%s'", (hook, declaration) => {
    expect(isHook(hook, declaration)).toBeFalsy();
});
