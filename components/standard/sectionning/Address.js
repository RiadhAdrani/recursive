import { CreateComponent } from "../../../index.js";

export default ({ children, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "address",
        children,
        props,
        key,
        events,
        hooks,
        style,
        flags,
    });
};
