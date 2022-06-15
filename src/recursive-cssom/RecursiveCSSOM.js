import { throwError } from "../recursive-dom/RecursiveError.js";
import processComponentStyleSheet from "./handlers/processComponentStyleSheet.js";
import processStyleSheets from "./handlers/mergeStyleSheets.js";
import renderStyleSheet from "./CssRender.js";
import mergeStyleSheets from "./handlers/mergeStyleSheets.js";

class RecursiveCSSOM {
    static singleton = new RecursiveCSSOM();

    constructor() {
        if (RecursiveCSSOM.singleton instanceof RecursiveCSSOM) {
            throwError("RecrusiveCSSOM cannot have more than one instance", [
                "RecrusiveCSSOM is an internal class and should not be used in development.",
            ]);
        }

        this.defaultComponentStyle = document.createElement("style");
        this.defaultComponentStyle.id = "default-components-style";

        this.appStaticStyle = document.createElement("style");
        this.appStaticStyle.id = "app-static-style";

        this.appDynamicStyle = document.createElement("style");
        this.appDynamicStyle.id = "app-dynamic-style";

        this.appStyle = document.createElement("style");
        this.appStyle.id = "app-components-style";

        document.querySelector("head").append(this.defaultComponentStyle);
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

    injectStaticStyle(styleSheet) {
        const ss = renderStyleSheet(styleSheet);
        if (ss !== this.staticSheet) {
            this.appStaticStyle.innerHTML = ss;
        }
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
}

const setStaticStyle = (
    cssobject = {
        var: {},
        import: [],
        fontFace: {},
        selectors: {},
        animations: {},
        mediaQueries: {},
    }
) => {
    RecursiveCSSOM.singleton.injectStaticStyle(cssobject);
};

const setStyle = (
    cssobject = {
        var: {},
        import: [],
        fontFace: {},
        selectors: {},
        animations: {},
        mediaQueries: {},
    }
) => {
    RecursiveCSSOM.singleton.addDynamicDeclaration(cssobject);
};

const updateStack = (stack) => {
    RecursiveCSSOM.singleton.update(stack);
};

export { setStaticStyle, setStyle, updateStack };
