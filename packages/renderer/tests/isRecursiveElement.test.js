import { isRecursiveElement } from "../utility";
import { RECURSIVE_ELEMENT_SYMBOL } from "../../constants";
it.each([
  [undefined, false],
  [null, false],
  ["", false],
  [{ $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL }, false],
  [{ elementType: "div" }, false],
  [{ elementType: "", $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL }, false],
  [{ elementType: "div", $$_RecursiveSymbol: Symbol.for("test") }, false],
  [{ elementType: "div", $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL }, true],
])("should determine if '%s' is a recursive element", (child, expected) => {
  expect(isRecursiveElement(child)).toBe(expected);
});
