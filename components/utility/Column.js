import { CreateComponent } from "../../index.js";
import View from "../View";

class Column extends View {
    constructor() {
        super("column-view");
    }
}

View.makeDefaultStyle("column-view{display:flex;flex-direction:column;}");

export default ({ children, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "column-view",
        children,
        props,
        key,
        events,
        hooks,
        style,
        flags,
    });
};
