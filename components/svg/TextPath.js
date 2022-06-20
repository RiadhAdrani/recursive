import { CreateSvgComponent } from "../../index.js";

export default ({ children, props, key, events, hooks, style, flags }) => {
    return new CreateSvgComponent({
        tag: "textPath",
        children,
        props: { ...props },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
