import StateRegistry from "../RecursiveState/StateRegistry.js";
import { throwError } from "../RecursiveDOM/RecursiveError.js";
import { findMatch } from "./RecursiveRouter.js";

class RecursiveRouterContext {
    static singleton = new RecursiveRouterContext();

    constructor() {
        if (RecursiveRouterContext.singleton instanceof RecursiveRouterContext) {
            throwError("RecursiveRouterContext cannot have more than one instance", [
                "RecursiveRouterContext is an internal class and should not be used in development.",
                "User RecrusiveRouter.createRouter to make a new router.",
            ]);
        }

        this.context = undefined;
        this.stack = [];

        this.depth = 0;
        this.fragments = [];
        this.anchor = "";
    }

    startContext(newContext) {
        this.depth++;
        if (this.context) {
            this.stack.push(this.context);
        }
        this.context = newContext;
    }

    endCurrentContext() {
        if (this.context) {
            if (this.stack.length > 0) this.context = this.stack.pop();
            else this.context = undefined;
        }
        this.depth--;
    }

    getContext = () => this.stack;

    encapsulate(context, component) {
        if (typeof component !== "function")
            throwError("Encapsulated component is not a function", [
                `RecursiveRouterContext.encapsulate require two parameters :
                     the first is the context data 
                     and the second being a function return the components to encapsulate`,
            ]);

        this.startContext(context);
        const encapsulated = component();
        this.endCurrentContext();

        return encapsulated;
    }

    setParams = () => {
        const [route] = StateRegistry.getReservedState("route");

        this.fragments = route
            .split("/")
            .slice(1)
            .map((value) => `/${value}`);
    };

    renderPortion = () => {
        if (this.depth > this.fragments.length) return "";

        const expectedRoute = this.fragments.slice(0, this.depth).reduce((prev, val) => {
            return `${prev}${val}`;
        });

        const res = findMatch(expectedRoute);

        if (res) {
            return res.isDynamic ? res.template.component() : res.component();
        } else "";
    };

    static encapsulate = (context, component) => this.singleton.encapsulate(context, component);

    static getContext = () => this.singleton.getContext();
}

const encapsulateRoute = (context, component) => {
    return RecursiveRouterContext.encapsulate(context, component);
};

const renderFragment = () => RecursiveRouterContext.singleton.renderPortion();

const setParams = () => RecursiveRouterContext.singleton.setParams();

export { encapsulateRoute, renderFragment, setParams };
