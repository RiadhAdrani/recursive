import { CreateComponent } from "../../../index.js";

export default ({
    children,
    align,
    color,
    noShade,
    size,
    width,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "hr",
        children,
        props: { ...props, align, color, noShade, size, width },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
