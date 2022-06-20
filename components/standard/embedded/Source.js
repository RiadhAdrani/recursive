import { CreateComponent } from "../../../index.js";

export default ({
    type,
    src,
    srcSet,
    sizes,
    media,
    height,
    width,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "source",
        props: { ...props, referrerPolicy, type, src, srcSet, sizes, media, height, width },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
