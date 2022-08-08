const preparePath = require("../src/preparePath");

it.each([
    ["/", "/"],
    ["/ ", "/"],
    ["/my-route", "/my-route"],
    [" /my/nested/route ", "/my/nested/route"],
    ["/my%20route", "/my route"],
])("should prepare path correctly", (input, expected) => {
    expect(preparePath(input)).toBe(expected);
});

it.each([[""], [" "], ["my-route"], [null], [undefined], [[]], [{}], [0]])(
    "should throw an error",
    (input) => {
        expect(() => preparePath(input).toThrow(Error));
    }
);
