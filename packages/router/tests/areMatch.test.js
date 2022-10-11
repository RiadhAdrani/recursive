const { areMatch } = require("../utility");

it.each([
    ["/route", "/route", true],
    ["/user/123", "/user/:id", true],
    ["/user/123/name/framework", "/user/:id/name/:name", true],
])("should should find the correct path '%s'", (path, template, expected) => {
    expect(areMatch(template, path)).toBe(expected);
});
