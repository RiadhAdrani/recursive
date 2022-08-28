const { RECURSIVE_ELEMENT_SYMBOL } = require("../../constants");

/**
 * Create an element with the recursive signature symbol.
 * @param {string} elementType Element type
 * @param  {any} props Element properties.
 * @returns {import("../../../lib").RecursiveElement} Recursive Element.
 */
function createElement(elementType, props) {
    return {
        ...props,
        elementType,
        $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
    };
}

module.exports = createElement;
