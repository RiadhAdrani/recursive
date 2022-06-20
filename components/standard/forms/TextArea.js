import { CreateComponent } from "../../../index.js";

export default ({
    children,
    value,
    autoComplete,
    autoFocus,
    cols,
    disabled,
    form,
    maxLength,
    minLength,
    name,
    placeholder,
    readOnly,
    required,
    rows,
    spellCheck,
    wrap,
    props,
    key,
    events,
    hooks,
    style,
    flags,
}) => {
    return new CreateComponent({
        children,
        tag: "textarea",
        data: { value },
        props: {
            ...props,
            value,
            autoComplete,
            autoFocus,
            cols,
            disabled,
            form,
            maxLength,
            minLength,
            name,
            placeholder,
            readOnly,
            required,
            rows,
            spellCheck,
            wrap,
        },
        key,
        events,
        hooks,
        style,
        flags,
    });
};
