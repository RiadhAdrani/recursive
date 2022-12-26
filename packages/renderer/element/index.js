import { RECURSIVE_ELEMENT_SYMBOL } from "../../constants";

export function createElement(elementType, props) {
  return {
    elementType,
    ...props,
    $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
  };
}
