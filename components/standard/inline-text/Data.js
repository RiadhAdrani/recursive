import { CreateComponent } from "../../../index.js";

export default ({ children, value, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "data",
        children,
        props: { ...props, value },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
