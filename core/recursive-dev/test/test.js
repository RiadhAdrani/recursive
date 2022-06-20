import CreateComponentTest from "../../create-component/CreateComponent.test.js";
import RecursiveCSSOMTest from "../../recursive-cssom/RecursiveCSSOM.test.js";
import { Render, setStyle, setCache } from "../../../index.js";
import { Column } from "../../../components/utility.js";
import { Button, Details, H1, H2, Hr, P, Span, Summary } from "../../../components/html.js";
import { Text } from "../../../components/vector.js";

const tests = [...CreateComponentTest, ...RecursiveCSSOMTest];

const App = () => {
    const [toggleFailed, setToggle] = setCache("toggle-failed", false);

    setStyle({
        var: {
            blue: "red",
        },
        selectors: {
            "*": { fontFamily: "monospace", fontSize: "20px" },
            html: { overflowY: "scroll" },
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

    const filter = tests.filter((item) => (toggleFailed ? item.passed === false : true));

    return Column({
        props: { className: "column app" },
        style: {
            scoped: true,
            className: "app-wrapper",
            normal: { color: "inherit" },
            hover: { color: "inherit" },
        },
        children: [
            H1({ children: `${tests.length} tests have completed.` }),
            H2({ children: `${success} have passed.` }),
            H2({ children: `${fail} have failed.` }),
            Button({
                children: [`Show only failed tests : `, toggleFailed ? "on" : "off"],
                style: { inline: { marginBottom: "20px" } },
                events: {
                    onClick: () => {
                        setToggle(!toggleFailed);
                    },
                },
            }),
            ...filter.map((item) => {
                return Details({
                    props: {
                        className: item.passed ? "wrapper passed" : "wrapper failed",
                    },
                    children: [
                        Summary({
                            children: [item.description, " : ", item.passed ? "Passed" : "Failed"],
                        }),
                        Hr({ size: "1px", color: "white" }),
                        Column({
                            props: { className: "content" },
                            children: [
                                P({
                                    children: [
                                        Span({
                                            children: "Expected:",
                                            props: { className: "label" },
                                        }),
                                        ` ${item.toBe}`,
                                    ],
                                }),
                                P({
                                    children: [
                                        Span({
                                            children: "Result:",
                                            props: { className: "label" },
                                        }),
                                        ` ${item.result}`,
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            }),
        ],
    });
};

Render(App);
