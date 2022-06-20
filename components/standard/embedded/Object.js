import { CreateComponent } from "../../../index.js";

export default ({
    children,
    props,
    data,
    form,
    height,
    name,
    type,
    useMap,
    width,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "object",
        children,
        props: { ...props, data, form, height, name, type, useMap, width },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
