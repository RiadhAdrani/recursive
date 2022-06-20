import { CreateComponent } from "../../../index.js";

export default ({
    children,
    download,
    href,
    hrefLang,
    ping,
    referrerPolicy,
    rel,
    target,
    type,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "a",
        children,
        props: {
            ...props,
            download,
            href,
            hrefLang,
            ping,
            referrerPolicy,
            rel,
            target,
            type,
        },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
