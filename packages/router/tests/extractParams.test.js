const { isDynamicFragment, extractParams } = require("../utility");

it.each([
    ["/", "/:id", { id: "" }],
    ["/user", "/:id", { id: "user" }],
    ["/:id", "/:id", { id: ":id" }],
    ["/user/123/section/about", "/user/:id/section/:section", { id: "123", section: "about" }],
])("should extract correct params '%s' x '%s'", (path, template, expected) => {
    expect(extractParams(template, path)).toStrictEqual(expected);
});
