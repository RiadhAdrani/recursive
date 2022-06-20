import { CreateComponent } from "../../../index.js";

export default (props) => {
    return new CreateComponent({
        ...props,
        tag: "template",
    });
};
