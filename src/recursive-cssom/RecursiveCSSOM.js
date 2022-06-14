import HandleStyleObject from "./handlers/HandleStyleObject.js";
import RecursiveDOM from "../recursive-dom/RecursiveDOM.js";
import { throwError } from "../recursive-dom/RecursiveError.js";
import StaticStyleResolver from "./handlers/StaticStyleResolver.js";
import RecursiveCSSOMExporter from "./handlers/Exporter.js";

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
        this.current = {
            selectors: [],
            animations: [],
            mediaQueries: [],
        };
    }

    /**
     * Update component's and dynamic styles of the application.
     * @param {Object} stack contains styles declarations
     */
    update(stack) {
        this.injectDynamicStyle();

        this.current = {
            selectors: [],
            animations: [],
            mediaQueries: [],
        };

        stack.forEach((item) => {
            if (item.className) {
                HandleStyleObject(
                    item,
                    this.current.selectors,
                    this.current.mediaQueries,
                    this.current.animations
                );
            }
        });

        const exported = RecursiveCSSOMExporter(
            this.current.selectors,
            this.current.animations,
            this.current.mediaQueries
        );

        const newStyle = exported.ss;

        if (RecursiveDOM.devMode) {
            if (exported.warnings.animation) {
                console.warn(exported.warnings.animation);
            }
            if (exported.warnings.selectors) {
                console.warn(exported.warnings.selectors);
            }
        }

        if (this.sheet !== newStyle) {
            this.appStyle.innerHTML = newStyle;
            this.sheet = newStyle;
        }
    }

    injectStaticStyle(styleSheet) {
        const ss = StaticStyleResolver(styleSheet);
        if (ss !== this.staticSheet) {
            this.appStaticStyle.innerHTML = ss;
        }
    }

    addDynamicDeclaration(object) {
        this.dynamicStack.push(object);
    }

    injectDynamicStyle() {
        let dss = "";
        this.dynamicStack.forEach((declaration) => {
            dss += StaticStyleResolver(declaration);
        });

        if (dss != this.dynamicSheet) {
            this.appDynamicStyle.innerHTML = dss;
            this.dynamicSheet = dss;
        }

        this.dynamicStack = [];
    }
}

const setStaticStyle = (cssobject) => {
    RecursiveCSSOM.singleton.injectStaticStyle(cssobject);
};

const setStyle = (cssobject) => {
    RecursiveCSSOM.singleton.addDynamicDeclaration(cssobject);
};

const updateStack = (stack) => {
    RecursiveCSSOM.singleton.update(stack);
};

export { setStaticStyle, setStyle, updateStack };
