const { areEqual } = require("..");

const fn = () => {};

const obj1 = {
    count: 0,
    update: fn,
};

const obj2 = {
    count: 0,
    update: fn,
};

test.each([
    [obj1, obj2, true],
    [
        obj1,
        {
            count: 0,
            update: () => {},
        },
        false,
    ],
    ["", "", true],
    ["", "a", false],
    [1, 1, true],
    [1, 2, false],
    [null, null, true],
    [undefined, undefined, true],
    [false, false, true],
    [false, true, false],
    [{}, {}, true],
    [{}, { key: "" }, false],
    [[], [], true],
    [[], [1], false],
    [["hello"], ["hello"], true],
    [[{}], [{}], true],
    [[{}, {}, {}], [{}, {}, {}], true],
    [
        { name: "recursive", type: "framework", age: 1 },
        { name: "recursive", type: "framework", age: 1 },
        true,
    ],
    [
        { name: "recursive", type: "framework", age: 1 },
        { name: "recursed", type: "framework", age: 1 },
        false,
    ],
    [
        { name: "recursive", type: "framework", age: 1 },
        { name: "recursive", type: "framework" },
        false,
    ],
    [
        { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: 11 } } } } } } } } } },
        { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: 11 } } } } } } } } } },
        true,
    ],
    [
        { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: { 11: { 12: "" } } } } } } } } } } } },
        { 1: { 2: { 3: { 4: { 5: { 6: { 7: { 8: { 9: { 10: { 11: { 12: 13 } } } } } } } } } } } },
        true,
    ],
    [
        {
            a: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            b: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            c: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            d: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
        },
        {
            a: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            b: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            c: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            d: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
        },
        true,
    ],
    [
        {
            a: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            b: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            c: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            d: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
        },
        {
            a: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            b: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            c: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "",
            },
            d: {
                a: {
                    a: { a: { a: "", b: "", c: "", d: "" }, b: "", c: "", d: "" },
                    b: "",
                    c: "",
                    d: "",
                },
                b: "",
                c: "",
                d: "1",
            },
        },
        false,
    ],
])("should compare items as expected : ' %s ' vs ' %s '", (obj1, obj2, expected) => {
    expect(areEqual(obj1, obj2)).toBe(expected);
});
