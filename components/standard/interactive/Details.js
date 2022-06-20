import { CreateComponent } from "../../../index.js";

export default ({ children, open, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "details",
        children,
        props: { ...props, open },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
