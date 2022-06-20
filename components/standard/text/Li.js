import { CreateComponent } from "../../../index.js";

export default ({ children, value, type, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "li",
        children,
        props: { ...props, value, type },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
