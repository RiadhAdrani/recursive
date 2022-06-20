import { CreateComponent } from "../../../index.js";

export default ({
    autoplay,
    controls,
    loop,
    muted,
    preload,
    src,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "audio",
        props: {
            ...props,
            autoplay,
            controls,
            loop,
            muted,
            preload,
            src,
        },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
