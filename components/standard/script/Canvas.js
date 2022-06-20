import { CreateComponent } from "../../../index.js";

export default ({ children, props, height, width, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "canvas",
        children,
        props: { ...props, height, width },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
