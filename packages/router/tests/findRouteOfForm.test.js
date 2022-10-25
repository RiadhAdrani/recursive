const { findRouteOfForm } = require("../utility");

const routes = {
    "/": {},
    "/route": {},
    "/route/:id": {},
    "/route/rec": {},
    "/user/:id/name/:name": {},
};

it.each([
    ["/route", "/route"],
    ["/user/123/name/framework", "/user/:id/name/:name"],
    ["/route/123", "/route/:id"],
    ["/route/rec", "/route/rec"],
    ["", false],
    [undefined, false],
    [false, false],
    [0, false],
    [[], false],
    [{}, false],
    ["/", "/"],
    ["/:id:name;;", false],
])("should find the correct path '%s'", (input, expected) => {
    expect(findRouteOfForm(input, routes)).toBe(expected);
});
