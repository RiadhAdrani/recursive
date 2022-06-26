import { throwError } from "../../core/recursive-error/RecursiveError.js";
import processComponentStyleSheet from "./handlers/processComponentStyleSheet.js";
import processStyleSheets from "./handlers/mergeStyleSheets.js";
import renderStyleSheet from "./CssRender.js";
import mergeStyleSheets from "./handlers/mergeStyleSheets.js";

class RecursiveCSSOM {
    constructor() {
        if (RecursiveCSSOM.singleton instanceof RecursiveCSSOM) {
            throwError("RecrusiveCSSOM cannot have more than one instance", [
                "RecrusiveCSSOM is an internal class and should not be used in development.",
            ]);
        }

        this.appStaticStyle = document.createElement("style");
        this.appDynamicStyle = document.createElement("style");
        this.appStyle = document.createElement("style");

        document.querySelector("head").append(this.appStaticStyle);
        document.querySelector("head").append(this.appStyle);
        document.querySelector("head").append(this.appDynamicStyle);

        this.sheet = "";
        this.staticSheet = "";
        this.dynamicSheet = "";

        this.dynamicStack = [];
    }

    /**
     * Update component's and dynamic styles of the application.
     * @param {Object} stack contains styles declarations
     */
    update(stack) {
        this.injectDynamicStyle();

        const res = renderStyleSheet(
            processStyleSheets((stack || []).map((item) => processComponentStyleSheet(item)))
        );

        if (this.sheet !== res) {
            this.appStyle.innerHTML = res;
            this.sheet = res;
        }
    }

    addStaticStyle(styleSheet) {
        this.appStaticStyle.innerHTML += renderStyleSheet(styleSheet);
    }

    addDynamicDeclaration(
        object = {
            var: {},
            import: [],
            fontFace: {},
            selectors: {},
            animations: {},
            mediaQueries: {},
        }
    ) {
        this.dynamicStack.push(object);
    }

    injectDynamicStyle() {
        const res = renderStyleSheet(mergeStyleSheets(this.dynamicStack));

        if (this.dynamicSheet !== res) {
            this.appDynamicStyle.innerHTML = res;
            this.dynamicSheet = res;
        }

        this.dynamicStack = [];
    }

    setStyle(
        cssobject = {
            var: {},
            import: [],
            fontFace: {},
            selectors: {},
            animations: {},
            mediaQueries: {},
        }
    ) {
        this.addDynamicDeclaration(cssobject);
    }
}

export default RecursiveCSSOM;
