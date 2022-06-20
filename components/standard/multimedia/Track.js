import { CreateComponent } from "../../../index.js";

export default ({ def, kind, label, src, srcLang, props, key, events, hooks, style, flags }) => {
    return new CreateComponent({
        tag: "track",
        props: { ...props, def, kind, label, src, srcLang, props },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
