import CreateComponentTest from "../../create-component/CreateComponent.test.js";
import { Render, CreateComponent, setStaticStyle } from "../../../index.js";

const tests = [...CreateComponentTest];

setStaticStyle({
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
            color: "red",
        },
        ".label": {
            backgroundColor: "#00000044",
            padding: "2px",
        },
    },
});

const Run = () => {
    const App = () => {
        return new CreateComponent({
            tag: "div",
            props: { className: "column app" },
            style: {
                scoped: true,
                className: "app-wrapper",
                normal: { color: "inherit" },
                hover: { color: "inherit" },
                animations: [],
                mediaQueries: [],
            },
            children: [
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
                                                    children: "Expected : ",
                                                    props: { className: "label" },
                                                }),
                                                `${item.toBe}`,
                                            ],
                                        }),
                                        new CreateComponent({
                                            tag: "p",
                                            children: [
                                                new CreateComponent({
                                                    tag: "span",
                                                    children: "Result : ",
                                                    props: { className: "label" },
                                                }),
                                                `${item.result}`,
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
};

function describe(description) {
    return {
        assert(value, stringify = false) {
            return {
                start(callback) {
                    const result = stringify ? JSON.stringify(callback()) : callback();
                    const toBe = stringify ? JSON.stringify(value) : value;

                    const res = { description, toBe, result, passed: toBe === result };

                    return res;
                },
            };
        },
    };
}

export { Run, describe };
