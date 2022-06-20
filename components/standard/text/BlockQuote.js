import { CreateComponent } from "../../../index.js";

export default ({ children, props, cite, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "blockquote",
        children,
        props: { ...props, cite },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
