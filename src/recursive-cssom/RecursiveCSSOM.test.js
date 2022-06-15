import { describe } from "../recursive-dev/test/RecursiveTest.js";
import { render as renderAnimation, isValidName } from "./CssAnimations.js";
import { render as renderProp } from "./CssProperties.js";
import { render as renderSelector } from "./CssSelectors.js";
import { render as renderVar } from "./CssVar.js";
import { render as renderImport } from "./CssImport.js";
import { render as renderFont } from "./CssFontFace.js";
import { render as renderMedia } from "./CssMediaQueries.js";
import CssRender from "./CssRender.js";

const propertyRender = describe("CSS property rendering")
    .assert("color:red;")
    .start(() => {
        return renderProp("color", "red");
    });

const selectorRender = describe("CSS selector rendering")
    .assert("#test{background-color:purple;}")
    .start(() => {
        return renderSelector("#test", { backgroundColor: "purple" });
    });

const varRender = describe("CSS var rendering")
    .assert(":root{--test:blue;}")
    .start(() => {
        return renderVar({ test: "blue" });
    });

const animationName = describe("CSS animation name validation")
    .assert([true, false, false, false], true)
    .start(() => {
        return [
            isValidName("test"),
            isValidName("te st"),
            isValidName("inherit"),
            isValidName("--test"),
        ];
    });

const animationRender = describe("CSS animation rendering")
    .assert("@keyframes test{}")
    .start(() => {
        return renderAnimation("test", {});
    });

const importRender = describe("CSS import rendering")
    .assert('@import url("test");')
    .start(() => {
        return renderImport(["test"]);
    });

const fontFaceRender = describe("CSS Font Face rendering")
    .assert("@font-face{font-family:'test';}")
    .start(() => renderFont({ fontFamily: "'test'" }));

const mediaQueryRender = describe("CSS Media Queries rendering")
    .assert(
        "@media test-query{.normal{border-left-color:cyan;}.normal:hover{border-top-color:black;}}"
    )
    .start(() =>
        renderMedia("test-query", {
            ".normal": { borderLeftColor: "cyan" },
            ".normal:hover": { borderTopColor: "black" },
        })
    );

const sheetRender = describe("CSS rendering")
    .assert(
        ".recursive{flex-direction:column;}@media test{.epic{font-family:monospace;}}@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(359deg);}}"
    )
    .start(() =>
        CssRender({
            selectors: { ".recursive": { flexDirection: "column" } },
            animations: {
                spin: { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(359deg)" } },
            },
            mediaQueries: {
                test: { ".epic": { fontFamily: "monospace" } },
            },
        })
    );

const tests = [
    propertyRender,
    selectorRender,
    varRender,
    animationName,
    animationRender,
    importRender,
    fontFaceRender,
    mediaQueryRender,
    sheetRender,
];

export default tests;
