import { describe } from "../recursive-dev/test/RecursiveTest.js";
import CreateComponent from "./CreateComponent.js";
import CreateTextNode from "./CreateTextNode.js";

const emptyTag = describe("Empty tag")
    .assert(undefined)
    .start(() => {
        try {
            return new CreateComponent({});
        } catch (error) {}
    });

const prepareAttributes = describe("Prepare attributes")
    .assert({ id: "test", className: "test", title: "test" }, true)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            props: { id: "test", className: "test", title: "test" },
        }).props;
    });

const invalidAttributes = describe("Invalid attribute")
    .assert(undefined)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            props: { test: "hello" },
        }).props.test;
    });

const prepareEvents = describe("Prepare events")
    .assert("test")
    .start(() => {
        return new CreateComponent({
            tag: "p",
            events: { onClick: () => "test" },
        }).events.onClick();
    });

const invalidEvents = describe("Invalid event")
    .assert(undefined)
    .start(() => {
        try {
            return new CreateComponent({
                tag: "p",
                events: { onTest: () => "test" },
            }).events.onClick();
        } catch (e) {}
    });

const prepareHooks = describe("Prepare hooks")
    .assert("test")
    .start(() => {
        return new CreateComponent({
            tag: "p",
            hooks: { onRef: () => "test" },
        }).hooks.onRef();
    });

const invalidHooks = describe("Invalid hooks")
    .assert(undefined)
    .start(() => {
        try {
            return new CreateComponent({
                tag: "p",
                hooks: { onRef: () => "test" },
            }).hooks.onTest();
        } catch (error) {}
    });

const prepareFlags = describe("Prepare flags")
    .assert(false)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            flags: { renderIf: false },
        }).flags.renderIf;
    });

const invalidFlags = describe("Invalid flags")
    .assert(undefined)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            flags: { test: false },
        }).flags.test;
    });

const prepareChildren = describe("Prepare children")
    .assert([CreateTextNode("Hello World")], true)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            children: ["Hello World"],
        }).children;
    });

const ignoreNullAndUndefinedChildren = describe("Ignore null and undefined children")
    .assert([CreateTextNode("Hello World")], true)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            children: [null, "Hello World", undefined],
        }).children;
    });

const arrayWithinChildren = describe("Array within children")
    .assert(undefined)
    .start(() => {
        try {
            return new CreateComponent({
                tag: "p",
                children: [["Hello World"]],
            }).children;
        } catch (error) {}
    });

const ignoreFlaggedChild = describe("Ignore flagged children")
    .assert([], true)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            children: [new CreateComponent({ tag: "div", flags: { renderIf: false } })],
        }).children;
    });

const processFragment = describe("Process fragment children")
    .assert([CreateTextNode("Hello World")], true)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            children: [
                new CreateComponent({
                    tag: "fragment",
                    children: "Hello World",
                }),
            ],
        }).children;
    });

const FragmenWithinFragment = describe("Process fragment children")
    .assert([CreateTextNode("Hello World")], true)
    .start(() => {
        return new CreateComponent({
            tag: "p",
            children: [
                new CreateComponent({
                    tag: "fragment",
                    children: new CreateComponent({
                        tag: "fragment",
                        children: "Hello World",
                    }),
                }),
            ],
        }).children;
    });

const validClassName = describe("Valid class name")
    .assert("hello-world")
    .start(() => {
        return new CreateComponent({
            tag: "p",
            props: { className: "hello-world" },
        }).props.className;
    });

const invalidClassName = describe("Invalid class name")
    .assert(undefined)
    .start(() => {
        try {
            return new CreateComponent({
                tag: "p",
            }).isValidClassName("123");
        } catch (error) {}
    });

const uidify = describe("Uidify component")
    .assert("0-0")
    .start(() => {
        const tree = new CreateComponent({
            tag: "p",
            children: new CreateComponent({ tag: "div" }),
        });

        tree.uidify();

        return tree.children[0].uid;
    });

const renderDataSet = describe("Render data-*")
    .assert({ value: "hello world" }, true)
    .start(() => {
        const tree = new CreateComponent({
            tag: "p",
            data: { value: "hello world" },
        });

        return tree.render().dataset;
    });

const renderAttributes = describe("Render attributes")
    .assert("hello world")
    .start(() => {
        const tree = new CreateComponent({
            tag: "input",
            props: { value: "hello world" },
        });

        return tree.render().value;
    });

const renderEvents = describe("Render events")
    .assert("hello world")
    .start(() => {
        const tree = new CreateComponent({
            tag: "input",
            events: { onClick: () => "hello world" },
        });

        return tree.render().events.onClick();
    });

const renderChildren = describe("Render children")
    .assert('<div>Hello World<input value="test"></div>')
    .start(() => {
        const tree = new CreateComponent({
            tag: "div",
            children: [
                "Hello World",
                new CreateComponent({
                    tag: "input",
                    props: { value: "test" },
                }),
            ],
        });

        return tree.render().outerHTML;
    });

export default [
    emptyTag,
    prepareAttributes,
    invalidAttributes,
    prepareEvents,
    invalidEvents,
    prepareHooks,
    invalidHooks,
    prepareFlags,
    invalidFlags,
    prepareChildren,
    ignoreNullAndUndefinedChildren,
    arrayWithinChildren,
    ignoreFlaggedChild,
    processFragment,
    FragmenWithinFragment,
    validClassName,
    invalidClassName,
    uidify,
    renderDataSet,
    renderAttributes,
    renderEvents,
    renderChildren,
];
