const { findRouteOfForm } = require("../utility");

const routes = {
    "/": {},
    "/route": {},
    "/route/:id": {},
    "/user/:id/name/:name": {},
};

it.each([
    ["/route", "/route"],
    ["/user/123/name/framework", "/user/:id/name/:name"],
    ["", false],
    [undefined, false],
    [false, false],
    [0, false],
    [[], false],
    [{}, false],
    ["/", "/"],
    ["/:id:name;;", false],
])("should should find the correct path '%s'", (input, expected) => {
    expect(findRouteOfForm(input, routes)).toBe(expected);
});
