import { CreateComponent } from "../../../index.js";

export default ({ children, name, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "slot",
        children,
        props: { ...props, name },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
