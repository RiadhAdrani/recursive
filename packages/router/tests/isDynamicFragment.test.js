const { isDynamicFragment } = require("../utility");

it.each([
    ["", false],
    ["user", false],
    [":id", true],
])("should determine if the fragment is dynamic '%s'", (input, expected) => {
    expect(isDynamicFragment(input)).toBe(expected);
});
