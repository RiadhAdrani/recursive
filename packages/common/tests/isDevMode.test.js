const isDevMode = require("../src/isDevMode");

test("is-dev-mode test", () => {
    expect(isDevMode()).toBe(false);
});
