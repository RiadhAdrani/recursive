import { CreateComponent } from "../../index.js";
import View from "../View";

class Spacer extends View {
    constructor() {
        super("spacer-view");
    }
}

View.makeDefaultStyle("spacer-view{display:block;}");

export default ({ height = "0px", width = "0px", flags, mediaQueries = [] }) => {
    return new CreateComponent({
        tag: "spacer-view",
        flags,
        style: {
            scoped: true,
            normal: {
                boxSizing: "content-box",
                minHeight: height,
                maxHeight: height,
                minWidth: width,
                maxWidth: width,
                display: "inline-block",
            },
            mediaQueries,
        },
    });
};
