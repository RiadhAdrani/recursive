import { View, Props, CreateComponent } from "../View";

class Column extends View {
    constructor() {
        super("column-view");
    }
}

View.makeDefaultStyle("column-view{display:flex;flex-direction:column;}");

/**
 * @param {Props} props
 */
export default (props) => {
    return new CreateComponent({
        ...props,
        tag: "column-view",
    });
};
