import { CreateComponent } from "../../../index.js";

export default ({
    children,
    async,
    crossOrigin,
    defer,
    fetchPriority,
    intergrity,
    noModule,
    nonce,
    referrerPolicy,
    src,
    type,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "script",
        children,
        props: {
            ...props,
            async,
            crossOrigin,
            defer,
            fetchPriority,
            intergrity,
            noModule,
            nonce,
            referrerPolicy,
            src,
            type,
        },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
