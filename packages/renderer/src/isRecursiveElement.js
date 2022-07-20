const { RECURSIVE_ELEMENT_SYMBOL } = require("../../constants");

/**
 * Check if the given element object is a valid recursive element.
 * @param {Object} element
 * @returns {boolean}
 */
function isRecursiveElement(element) {
    return (
        element &&
        element.elementType &&
        element.elementType.toString().trim() &&
        element.$$_RecursiveSymbol == RECURSIVE_ELEMENT_SYMBOL
    );
}

module.exports = isRecursiveElement;
