const { isDynamicRoute } = require("../utility");

it.each([
    ["/", {}, { isDynamic: false }],
    ["/", { "/": {} }, { isDynamic: false }],
    [
        "/about",
        {
            "/": {},
            "/about": {},
            "/user": {},
            "/else": {},
        },
        { isDynamic: false },
    ],
    [
        "/user=;",
        {
            "/": {},
            "/about": {},
            "/user=:id;": {},
        },
        { isDynamic: false },
    ],
    [
        "/user=:",
        {
            "/": {},
            "/about": {},
            "/user=:id;": {},
        },
        { isDynamic: false },
    ],
    [
        "/user=:;",
        {
            "/": {},
            "/about": {},
            "/user=:id;": {},
        },
        { isDynamic: true, template: {} },
    ],
    [
        "/user=:3;",
        {
            "/": {},
            "/about": {},
            "/user=:id;": {},
        },
        { isDynamic: true, template: {} },
    ],
    [
        "/user/:3;",
        {
            "/": {},
            "/about": {},
            "/user": {},
            "/user/:id;": {},
        },
        { isDynamic: true, template: {} },
    ],
])("should compute if a path is dynamic correctly case : '%s'", (input, routes, expected) => {
    expect(isDynamicRoute(input, routes)).toStrictEqual(expected);
});
