const { makeDiffList } = require("../utility");

it.each([
    [undefined, undefined, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [null, undefined, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    ["", undefined, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [1, undefined, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [{}, undefined, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [undefined, null, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [undefined, "", { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [undefined, 1, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [undefined, {}, { toRemove: {}, toUpdate: {}, toAdd: {} }],
    [{ color: "red" }, {}, { toRemove: { color: "red" }, toUpdate: {}, toAdd: {} }],
    [{}, { color: "red" }, { toRemove: {}, toUpdate: {}, toAdd: { color: "red" } }],
    [{ color: "blue" }, { color: "red" }, { toRemove: {}, toUpdate: { color: "red" }, toAdd: {} }],
    [
        { color: "blue", border: "1px" },
        { color: "red", background: "orange" },
        {
            toRemove: { border: "1px" },
            toUpdate: { color: "red" },
            toAdd: { background: "orange" },
        },
    ],
])("should create the correct diff object", (oldList, newList, expected) => {
    expect(makeDiffList(oldList, newList)).toStrictEqual(expected);
});
