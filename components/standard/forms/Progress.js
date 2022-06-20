import { CreateComponent } from "../../../index.js";

export default ({ children, max, value, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "progress",
        children,
        props: { ...props, max, value },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
