import { CreateComponent } from "../../../index.js";

export default ({
    children,
    value,
    min,
    max,
    low,
    high,
    optimum,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "meter",
        children,
        props: { ...props, value, min, max, low, high, optimum },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
