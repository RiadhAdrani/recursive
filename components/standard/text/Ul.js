import { CreateComponent } from "../../../index.js";

export default ({ children, compact, type, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "ul",
        children,
        props: { ...props, compact, type },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
