import { CreateComponent } from "../../../index.js";

export default ({ children, isFor, form, name, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "output",
        children,
        props: { ...props, isFor, form, name },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
