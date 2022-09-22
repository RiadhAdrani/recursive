const { RECURSIVE_ELEMENT_SYMBOL } = require("../../constants");

function createElement(elementType, props) {
    return {
        ...props,
        elementType,
        $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
    };
}

module.exports = { createElement };
