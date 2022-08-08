const findRouteOfForm = require("../src/findRouteOfForm");

const routes = {
    "/": {},
    "/route": {},
    "/route/:id;": {},
    "/user=:id;&name=:name;": {},
    "/:id;:name;": {},
};

it.each([
    ["/route", "/route"],
    ["/user=:123;&name=:framework;", "/user=:id;&name=:name;"],
    ["/:id;:name;", "/:id;:name;"],
    ["", false],
    [undefined, false],
    [false, false],
    [0, false],
    [[], false],
    [{}, false],
    ["/", "/"],
    ["/:id:name;;", false],
])("should should find the correct path", (input, expected) => {
    expect(findRouteOfForm(input, routes)).toBe(expected);
});
