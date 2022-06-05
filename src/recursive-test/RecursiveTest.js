import { Render } from "../../index.js";
import CreateComponent from "../create-component/CreateComponent";

function executeTest({ name, test, itemGetter, premise }) {
    Render(test);

    const result = itemGetter();

    return { name, passed: result === premise, premise, result };
}

const CreateComponentTest = () => {
    return executeTest({
        name: "create-component",
        test: () => {
            return new CreateComponent({ tag: "div" });
        },
        itemGetter: () => document.getElementById("root").innerHTML,
        premise: `<div></div>`,
    });
};

const HtmlAttributesTest = () => {
    return executeTest({
        name: "html-attributes",
        test: () => {
            return new CreateComponent({ tag: "img", props: { id: "test", src: "test.img" } });
        },
        itemGetter: () => document.getElementById("test").src,
        premise: `${location.origin}${location.pathname}test.img`,
    });
};

const ClassNameTest = () => {
    return executeTest({
        name: "class-attributes",
        test: () => {
            return new CreateComponent({ tag: "div", props: { id: "test" }, className: "test" });
        },
        itemGetter: () => document.getElementById("test").className,
        premise: `test`,
    });
};

const ClassNameWithStyleTest = () => {
    return executeTest({
        name: "class-and-style-class",
        test: () => {
            return new CreateComponent({
                tag: "div",
                props: { id: "test" },
                className: "test",
                style: { className: "styled" },
            });
        },
        itemGetter: () => document.getElementById("test").className,
        premise: `test styled`,
    });
};

const ClassNameWithScopedStyleTest = () => {
    return executeTest({
        name: "class-and-scoped-style",
        test: () => {
            return new CreateComponent({
                tag: "div",
                props: { id: "test" },
                className: "test",
                style: { className: "styled", scoped: true },
            });
        },
        itemGetter: () => document.getElementById("test").className,
        premise: `test styled-div-x`,
    });
};

const NoClassNameWithScopedStyleTest = () => {
    return executeTest({
        name: "no-class-but-style-class-and-scoped",
        test: () => {
            return new CreateComponent({
                tag: "div",
                props: { id: "test" },
                style: { className: "styled", scoped: true },
            });
        },
        itemGetter: () => document.getElementById("test").className,
        premise: `styled-div-x`,
    });
};

const NoClassNameAndNoStyleClassButScopedTest = () => {
    return executeTest({
        name: "no-class-name-but-scoped-style",
        test: () => {
            return new CreateComponent({
                tag: "div",
                props: { id: "test" },
                style: { scoped: true },
            });
        },
        itemGetter: () => document.getElementById("test").className,
        premise: ` -div-x`,
    });
};

const AppliedStyleTest = () => {
    return executeTest({
        name: "applied-css",
        test: () => {
            return new CreateComponent({
                tag: "div",
                props: { id: "test" },
                style: {
                    className: "test",
                    normal: { color: "red" },
                    hover: { color: "blue" },
                    mediaQueries: [{ condition: "mq", active: { color: "orange" } }],
                },
            });
        },
        itemGetter: () => document.getElementById("app-components-style").innerHTML,
        premise: `.test{color:red;}.test:hover{color:blue;}@media mq{.test:active{color:orange;}}`,
    });
};

const AppliedScopedStyleTest = () => {
    return executeTest({
        name: "applied-scoped-style",
        test: () => {
            const Item = () =>
                new CreateComponent({
                    tag: "div",
                    style: { className: "test", scoped: true, normal: { color: "blue" } },
                });

            return new CreateComponent({
                tag: "div",
                children: [Item(), Item()],
            });
        },
        itemGetter: () => document.getElementById("app-components-style").innerHTML,
        premise: ".test-div-xbx{color:blue;}.test-div-xby{color:blue;}",
    });
};

const tests = [
    CreateComponentTest(),
    HtmlAttributesTest(),
    ClassNameTest(),
    ClassNameWithStyleTest(),
    ClassNameWithScopedStyleTest(),
    NoClassNameWithScopedStyleTest(),
    NoClassNameAndNoStyleClassButScopedTest(),
    AppliedStyleTest(),
    AppliedScopedStyleTest(),
];

const Run = ({ showOnlyFailed = false }) => {
    console.log(`%cRunning ${tests.length} Tests ...`, "background:blue;padding:5px 10px;");

    tests.forEach((test) => {
        let style = "";
        let msg = "";

        if (test.passed) {
            msg = `%c${test.name} : passed`;
            style = "color:#00ff00;font-size:1em;";
        } else {
            msg = `%c${test.name} : failed \nExpected "${test.premise}" but got "${test.result}"`;
            style = "color:white;font-size:1em;background:#aa0000;padding:5px";
        }

        if (showOnlyFailed && test.passed == true) return;

        console.log(msg, style);
    });

    console.log(`%cCompleted ${tests.length} Tests`, "background:blue;padding:5px 10px;");
};

export { Run };
