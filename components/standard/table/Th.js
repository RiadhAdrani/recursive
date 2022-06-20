import { CreateComponent } from "../../../index.js";

export default ({
    children,
    abbr,
    colSpan,
    headers,
    rowSpan,
    scope,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "th",
        children,
        props: { ...props, abbr, colSpan, headers, rowSpan, scope },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
