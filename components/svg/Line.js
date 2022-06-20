import { CreateSvgComponent } from "../../index.js";

export default ({ children, props, key, events, hooks, style, flags }) => {
    return new CreateSvgComponent({
        tag: "line",
        children,
        props: { ...props },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
