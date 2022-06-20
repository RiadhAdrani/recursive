import { CreateComponent } from "../View";

export default ({ children, flags }) => {
    return new CreateComponent({
        tag: "fragment",
        children,
        flags,
    });
};
