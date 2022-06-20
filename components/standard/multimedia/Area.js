import { CreateComponent } from "../../../index.js";

export default ({
    children,
    alt,
    coords,
    download,
    href,
    hrefLang,
    ping,
    referrerPolicy,
    ref,
    shape,
    target,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "area",
        children,
        props: {
            ...props,
            alt,
            coords,
            download,
            href,
            hrefLang,
            ping,
            referrerPolicy,
            ref,
            shape,
            target,
        },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
