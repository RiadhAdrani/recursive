const { findExactRoute } = require("../utility");

const routes = {
    "/": {},
    "/route": {},
    "/user/:id": {},
    "/user/rec": {},
    "/user/:id/name/:name": {},
};

it.each([
    ["/", "/"],
    ["/route", "/route"],
    ["/user/123", false],
    ["/user/rec", "/user/rec"],
])("should should find the correct path '%s'", (input, expected) => {
    expect(findExactRoute(input, routes)).toBe(expected);
});
