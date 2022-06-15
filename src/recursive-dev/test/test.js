import CreateComponentTest from "../../create-component/CreateComponent.test.js";
import RecursiveCSSOMTest from "../../recursive-cssom/RecursiveCSSOM.test.js";
import { Render, CreateComponent, setStyle } from "../../../index.js";

const tests = [...CreateComponentTest, ...RecursiveCSSOMTest];

const App = () => {
    setStyle({
        var: { blue: "red" },
        fontFace: {
            fontFamily: "Roboto",
        },
        mediaQueries: {
            good: { normal: { color: "orange" } },
        },
        animations: {
            test: {
                from: { color: "red" },
                to: { color: "blue" },
            },
        },
        selectors: {
            "*": { fontFamily: "monospace", fontSize: "20px" },
            ".app": {
                padding: "10px",
            },
            "h1,h2": {
                margin: "0px",
                padding: "5px",
                textAlign: "center",
            },
            h1: { fontSize: "1.75em" },
            h2: { fontSize: "1.25em" },
            ".column": {
                display: "flex",
                flexDirection: "column",
            },
            p: {
                margin: "0px",
                lineHeight: 1.5,
            },
            ".content": {
                padding: "5px 5px 5px 20px",
                fontSize: "0.875em",
            },
            ".wrapper": {
                marginBottom: "5px",
                padding: "10px",
                borderRadius: "4px",
            },
            details: { cursor: "pointer" },
            ".passed": {
                backgroundColor: "green",
                color: "white",
            },
            ".failed": {
                backgroundColor: "#8f1919",
                color: "white",
            },
            ".label": {
                backgroundColor: "#00000044",
                padding: "2px",
                fontStyle: "italic",
            },
        },
    });

    const fail = tests.reduce((pre, val) => (val.passed === false ? pre + 1 : pre), 0);

    const success = tests.reduce((pre, val) => (val.passed === true ? pre + 1 : pre), 0);

    return new CreateComponent({
        tag: "div",
        props: { className: "column app" },
        style: {
            scoped: true,
            className: "app-wrapper",
            normal: { color: "inherit" },
            hover: { color: "inherit" },
        },
        children: [
            new CreateComponent({
                tag: "h1",
                children: `${tests.length} tests have completed.`,
            }),
            new CreateComponent({
                tag: "h2",
                children: `${success} have passed.`,
            }),
            new CreateComponent({
                tag: "h2",
                children: `${fail} have failed.`,
                style: { inline: { marginBottom: "20px" } },
            }),
            ...tests.map(
                (item) =>
                    new CreateComponent({
                        tag: "details",
                        props: {
                            className: item.passed ? "wrapper passed" : "wrapper failed",
                        },
                        children: [
                            new CreateComponent({
                                tag: "summary",
                                children: [
                                    item.description,
                                    " : ",
                                    item.passed ? "Passed" : "Failed",
                                ],
                            }),
                            new CreateComponent({
                                tag: "hr",
                                props: { size: "1px", color: "white" },
                            }),
                            new CreateComponent({
                                tag: "div",
                                props: { className: "column content" },
                                children: [
                                    new CreateComponent({
                                        tag: "p",
                                        children: [
                                            new CreateComponent({
                                                tag: "span",
                                                children: "Expected:",
                                                props: { className: "label" },
                                            }),
                                            ` ${item.toBe}`,
                                        ],
                                    }),
                                    new CreateComponent({
                                        tag: "p",
                                        children: [
                                            new CreateComponent({
                                                tag: "span",
                                                children: "Result:",
                                                props: { className: "label" },
                                            }),
                                            ` ${item.result}`,
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    })
            ),
        ],
    });
};

Render(App);
