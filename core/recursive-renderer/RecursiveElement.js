const ElementType = {
    instance: {},
    key: "",
    elementType: "",
    hooks: {},
    flags: {},
    children: [],
    style: {},
    rendererOptions: {},
    attributes: {},
    events: {},
    map: {},
    props: {},
};

/**
 * Create a Recursive element
 * @param {Object} props object of property
 */
const createRecursiveElement = function (props) {
    return {
        instance: undefined,
        key: props.key || undefined,
        elementType: props.elementType || undefined,
        hooks: props.hooks || {},
        flags: props.flags || {},
        children: props.children || [],
        style: props.style || {},
        rendererOptions: props.rendererOptions || {},
        props,
    };
};

export { ElementType, createRecursiveElement };
