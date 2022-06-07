import { Render } from "../../index.js";
import CreateComponent from "../create-component/CreateComponent";
import { clearStore as clearCache } from "../recursive-state/SetCache.js";
import { clearStore as cleanRefs } from "../recursive-state/SetReference.js";
import { setState, cleanStore as cleanStates } from "../recursive-state/SetState.js";

function executeTest({ name, test, itemGetter, premise }) {
    cleanStates();
    cleanRefs();
    clearCache();

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
            return new CreateComponent({
                tag: "img",
                props: {
                    id: "test",
                    src: "https://images.unsplash.com/photo-1654455103120-e33ac58ab56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80",
                },
            });
        },
        itemGetter: () => document.getElementById("test").src,
        premise: `https://images.unsplash.com/photo-1654455103120-e33ac58ab56a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80`,
    });
};

const ClassNameTest = () => {
    return executeTest({
        name: "class-attributes",
        test: () => {
            return new CreateComponent({ tag: "div", props: { id: "test", className: "test" } });
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
                props: { id: "test", className: "test" },
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
                props: { id: "test", className: "test" },
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
        premise: `div-x`,
    });
};

const UpdateClassNameTest = () => {
    return executeTest({
        name: "set-state",
        test: () => {
            const [value, setValue] = setState("value", "test-class-name");

            return new CreateComponent({
                tag: "div",
                props: { id: "test", className: value },
                style: { scoped: true, className: "test-style-class" },
                events: {
                    onClick: () => {
                        setValue("recursive");
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").className;
        },
        premise: `recursive test-style-class-div-x`,
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

const UpdateComponentToComponentTest = () => {
    return executeTest({
        name: "update-children-component-vs-component",
        test: () => {
            const [toggle, setToggle] = setState("toggle", true);

            const Item1 = new CreateComponent({ tag: "p" });
            const Item2 = new CreateComponent({ tag: "span" });

            return new CreateComponent({
                tag: "button",
                children: toggle ? Item1 : Item2,
                props: { id: "test" },
                events: { onClick: () => setToggle(!toggle) },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "<span></span>",
    });
};

const UpdateComponentToTextTest = () => {
    return executeTest({
        name: "update-children-component-vs-text",
        test: () => {
            const [uctt, setToggle] = setState("uctt", true);

            const Item1 = new CreateComponent({ tag: "p", children: "Item 1" });
            const Item2 = "Item 2";

            return new CreateComponent({
                tag: "button",
                children: uctt ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!uctt);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "Item 2",
    });
};

const UpdateTextToTextTest = () => {
    return executeTest({
        name: "update-children-text-vs-text",
        test: () => {
            const [uttt, setToggle] = setState("uttt", true);

            const Item1 = "Item 1";
            const Item2 = "Item 2";

            return new CreateComponent({
                tag: "button",
                children: uttt ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!uttt);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "Item 2",
    });
};

const UpdateMoreToLessTest = () => {
    return executeTest({
        name: "update-more-to-less-children",
        test: () => {
            const [umtlc, setToggle] = setState("umtlc", true);

            const Item1 = [
                new CreateComponent({ tag: "a", children: "item 1" }),
                new CreateComponent({ tag: "a", children: "item 2" }),
                new CreateComponent({ tag: "a", children: "item 3" }),
            ];
            const Item2 = new CreateComponent({ tag: "a", children: "item 0" });

            return new CreateComponent({
                tag: "div",
                children: umtlc ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!umtlc);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "<a>item 0</a>",
    });
};

const UpdateLessToMoreTest = () => {
    return executeTest({
        name: "update-less-to-more-children",
        test: () => {
            const [umtlc, setToggle] = setState("umtlc", true);

            const Item2 = [
                new CreateComponent({ tag: "a", children: "item 1" }),
                new CreateComponent({ tag: "a", children: "item 2" }),
                new CreateComponent({ tag: "a", children: "item 3" }),
            ];
            const Item1 = new CreateComponent({ tag: "a", children: "item 0" });

            return new CreateComponent({
                tag: "div",
                children: umtlc ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!umtlc);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "<a>item 1</a><a>item 2</a><a>item 3</a>",
    });
};

const UpdateMapMoreToLessTest = () => {
    return executeTest({
        name: "update-more-to-less-map",
        test: () => {
            const [ummtlt, setToggle] = setState("ummtlt", true);

            const Item1 = [
                new CreateComponent({ tag: "a", children: "item 1", key: 1 }),
                new CreateComponent({ tag: "a", children: "item 2", key: 2 }),
                new CreateComponent({ tag: "a", children: "item 3", key: 3 }),
            ];
            const Item2 = new CreateComponent({ tag: "a", children: "item 0", key: 4 });

            return new CreateComponent({
                tag: "div",
                children: ummtlt ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!ummtlt);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "<a>item 0</a>",
    });
};

const UpdateMapLessToMoreTest = () => {
    return executeTest({
        name: "update-less-to-more-map",
        test: () => {
            const [umltmt, setToggle] = setState("umltmt", true);

            const Item2 = [
                new CreateComponent({ tag: "a", children: "item 1", key: 1 }),
                new CreateComponent({ tag: "a", children: "item 2", key: 2 }),
                new CreateComponent({ tag: "a", children: "item 3", key: 3 }),
            ];
            const Item1 = new CreateComponent({ tag: "a", children: "item 0", key: 2 });

            return new CreateComponent({
                tag: "div",
                children: umltmt ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!umltmt);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "<a>item 1</a><a>item 2</a><a>item 3</a>",
    });
};

const UpdateMapChangePositionsTest = () => {
    return executeTest({
        name: "update-change-position-map",
        test: () => {
            const [umcpt, setToggle] = setState("umcpt", true);

            const Item1 = [
                new CreateComponent({ tag: "a", children: "item 1", key: 1 }),
                new CreateComponent({ tag: "a", children: "item 2", key: 2 }),
                new CreateComponent({ tag: "a", children: "item 3", key: 3 }),
            ];
            const Item2 = [
                new CreateComponent({ tag: "a", children: "item 3", key: 3 }),
                new CreateComponent({ tag: "a", children: "item 1", key: 1 }),
                new CreateComponent({ tag: "a", children: "item 2", key: 2 }),
            ];

            return new CreateComponent({
                tag: "div",
                children: umcpt ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!umcpt);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: "<a>item 3</a><a>item 1</a><a>item 2</a>",
    });
};

const InlineStyleTest = () => {
    return executeTest({
        name: "inline-style",
        test: () => {
            return new CreateComponent({
                tag: "p",
                children: "text",
                props: {
                    id: "test",
                },
                style: {
                    inline: { color: "red" },
                },
            });
        },
        itemGetter: () => document.getElementById("test").outerHTML,
        premise: `<p id="test" style="color: red;">text</p>`,
    });
};

const ChangeInlineStyleTest = () => {
    return executeTest({
        name: "change-inline-style",
        test: () => {
            const [cist, setValue] = setState("cist", "red");

            return new CreateComponent({
                tag: "p",
                children: "text",
                props: {
                    id: "test",
                },
                style: {
                    inline: { color: cist },
                },
                events: { onClick: () => setValue("blue") },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").outerHTML;
        },
        premise: `<p id="test" style="color: blue;">text</p>`,
    });
};

const ChangeAttributesTest = () => {
    return executeTest({
        name: "change-attributes-test",
        test: () => {
            const [value, setToggle] = setState("cat", true);

            const Item1 = new CreateComponent({ tag: "p", props: { id: "item" } });
            const Item2 = new CreateComponent({ tag: "p", props: { className: "item" } });

            return new CreateComponent({
                tag: "div",
                children: value ? Item1 : Item2,
                props: { id: "test" },
                events: {
                    onClick: () => {
                        setToggle(!value);
                    },
                },
            });
        },
        itemGetter: () => {
            document.getElementById("test").click();
            return document.getElementById("test").innerHTML;
        },
        premise: `<p class="item"></p>`,
    });
};

const Run = ({ showOnlyFailed = false }) => {
    document.title = "Testing ...";

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
        UpdateClassNameTest(),
        UpdateComponentToComponentTest(),
        UpdateComponentToTextTest(),
        UpdateTextToTextTest(),
        UpdateMoreToLessTest(),
        UpdateLessToMoreTest(),
        UpdateMapMoreToLessTest(),
        UpdateMapLessToMoreTest(),
        UpdateMapChangePositionsTest(),
        InlineStyleTest(),
        ChangeInlineStyleTest(),
        ChangeAttributesTest(),
    ];

    console.log(`%cRunning ${tests.length} Tests ...`, "background:purple;padding:5px;");

    const success = [];
    const fail = [];

    tests.forEach((test) => {
        let style = "";
        let msg = "";

        if (test.passed) {
            msg = `%c${test.name} : passed`;
            style = "color:#00ff00;font-size:10px;";
        } else {
            msg = `%c${test.name} : failed \nExpected "${test.premise}" but got "${test.result}"`;
            style = "color:white;font-size:1em;background:#aa0000;padding:5px";
        }

        if (showOnlyFailed && test.passed == true) return;

        console.log(msg, style);

        if (test.passed) success.push(test.name);
        else fail.push(test.name);
    });

    document.title = `Completed ${success.length}/${tests.length} Tests`;

    console.log(
        `%cCompleted ${success.length}/${tests.length} Tests`,
        "background:purple;padding:5px;"
    );
};

export { Run };
