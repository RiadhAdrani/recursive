import { View, CreateComponent } from "../View";

class Row extends View {
    constructor() {
        super("row-view");
    }
}

View.makeDefaultStyle("row-view{display:flex;flex-direction:row;}");

export default (props) => {
    return new CreateComponent({
        ...props,
        tag: "row-view",
    });
};
