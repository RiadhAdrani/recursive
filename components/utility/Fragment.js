import { CreateComponent } from "../../index.js";

export default ({ children, flags }) => {
    return new CreateComponent({
        tag: "fragment",
        children,
        flags,
    });
};
