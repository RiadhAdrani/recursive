import prepareElement from "./prepareElement.js";

/**
 * Return a verified element child
 * @param {import("../../../lib.js").RawElement} child
 * @param {string} id
 * @param {RecursiveRenderer} renderer
 * @param {import("../../../lib.js").RecursiveElement}
 */
function prepareChild(child, id, renderer) {
    if ([null, undefined].includes(child)) return false;

    if (!child.elementType) return { elementType: "#text", children: child, instance: undefined };
    else {
        if (child.flags && child.flags.renderIf === false) {
            return false;
        } else {
            let _prepared = false;

            renderer.contextManager.useContext(() => {
                _prepared = prepareElement(child, id, renderer);
            }, id);

            return _prepared;
        }
    }
}

export default prepareChild;
