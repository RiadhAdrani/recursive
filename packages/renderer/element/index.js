const { RECURSIVE_ELEMENT_SYMBOL } = require("../../constants");

/**
 * Create an element with the recursive signature symbol.
 * @param {string} elmentType element type
 * @param  {any} props element properties.
 * @returns {import("../../../lib").RecursiveElement}
 */
function createRecursiveElement(elementType, props) {
    return {
        ...props,
        elementType,
        $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
    };
}

module.exports = createRecursiveElement;
