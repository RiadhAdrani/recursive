const { isDynamicPath } = require("../utility");

it.each([
    ["/", false],
    ["/user", false],
    ["/user/:id", true],
    ["/user/:id/:section", true],
])("should determine if a path is dynamic '%s'", (input, expected) => {
    expect(isDynamicPath(input)).toBe(expected);
});
