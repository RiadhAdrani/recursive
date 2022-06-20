import { CreateComponent } from "../../../index.js";

export default ({
    children,
    props,
    allow,
    allowFullScreen,
    allowPaymentRequest,
    fetchPriority,
    loading,
    name,
    referrerPolicy,
    sandbox,
    src,
    width,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        tag: "iframe",
        children,
        props: {
            ...props,
            allow,
            allowFullScreen,
            allowPaymentRequest,
            fetchPriority,
            loading,
            name,
            referrerPolicy,
            sandbox,
            src,
            width,
        },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
