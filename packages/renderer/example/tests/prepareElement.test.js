const { RECURSIVE_ELEMENT_SYMBOL } = require("../../../constants");
const createRecursiveElement = require("../../element");
const prepareElement = require("../../src/prepareElement");
const createAbstractRenderer = require("./createAbstractRenderer");

describe("Renderer", () => {
    test("prepare-element valid-tree test", () => {
        expect(
            (() => {
                const app = () => {
                    return createRecursiveElement("div", {
                        children: createRecursiveElement("p", { children: "Hello" }),
                    });
                };

                const Renderer = createAbstractRenderer(app);

                const prepared = prepareElement(app(), "0", undefined, Renderer);

                // remove circular dependency
                delete prepared.parent;
                delete prepared.children[0].parent;

                return prepared;
            })()
        ).toStrictEqual({
            $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
            elementType: "div",
            events: {},
            attributes: {},
            hooks: {},
            flags: {},
            instance: {},
            style: {},
            map: false,
            key: undefined,
            ref: undefined,
            style: undefined,
            rendererOptions: undefined,
            uid: "0",
            indexInParent: 0,
            children: [
                {
                    $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
                    elementType: "p",
                    events: {},
                    attributes: {},
                    hooks: {},
                    flags: {},
                    instance: {},
                    style: {},
                    map: false,
                    key: undefined,
                    ref: undefined,
                    style: undefined,
                    rendererOptions: undefined,
                    uid: "0-0",
                    indexInParent: 0,
                    children: [
                        {
                            $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
                            children: "Hello",
                            elementType: "#text",
                            instance: undefined,
                        },
                    ],
                },
            ],
        });
    });

    const hollowDiv = {
        $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
        elementType: "div",
        events: {},
        attributes: {},
        hooks: {},
        flags: {},
        instance: {},
        style: {},
        map: false,
        key: undefined,
        ref: undefined,
        style: undefined,
        rendererOptions: undefined,
        uid: "0",
        indexInParent: 0,
        children: [],
    };

    test.each([
        [undefined, {}, false],
        [null, {}, false],
        ["", {}, false],
        [" ", {}, false],
        ["div", undefined, hollowDiv],
        ["div", null, hollowDiv],
        ["div", false, hollowDiv],
        ["div", "", hollowDiv],
        ["div", 1, hollowDiv],
        ["div", [], hollowDiv],
    ])("prepare-element variable-tree-tag='%s'&app='%s'&result='%s' test", (tag, props, result) => {
        expect(
            (() => {
                const app = () => {
                    return createRecursiveElement(tag, props);
                };

                const Renderer = createAbstractRenderer(app);

                const prepared = prepareElement(app(), "0", undefined, Renderer);

                // remove circular dependency
                delete prepared.parent;

                return prepared;
            })()
        ).toStrictEqual(result);
    });
});
