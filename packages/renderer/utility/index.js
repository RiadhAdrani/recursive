import { areEqual, hasProperty } from "@riadh-adrani/utility-js";
import { RECURSIVE_ELEMENT_SYMBOL } from "../../constants";

/**
 * Check if a given child is valid for processing.
 * @param {any} child
 * @returns {boolean}
 */
function isValidChild(child) {
  if ([undefined, null, ""].includes(child)) return false;
  if (Array.isArray(child)) return false;

  return true;
}

/**
 * Return the difference between two objects.
 * @param {object} oldList old list.
 * @param {object} newList new list.
 * @returns {object} containing three keys `toRemove`, `toUpdate` and `toAdd`.
 */
function makeDiffList(oldList, newList) {
  const toRemove = {};
  const toUpdate = {};
  const toAdd = {};

  let combined = {};

  if (typeof oldList == "object" && !Array.isArray(oldList)) {
    combined = { ...combined, ...oldList };
  }

  if (typeof newList == "object" && !Array.isArray(newList)) {
    combined = { ...combined, ...newList };
  }

  for (let key in combined) {
    if (hasProperty(newList, key)) {
      if (hasProperty(oldList, key)) {
        if (areEqual(oldList[key], newList[key]) === false) {
          toUpdate[key] = combined[key];
        }
      } else if (!hasProperty(oldList, key)) {
        toAdd[key] = combined[key];
      }
    } else {
      toRemove[key] = combined[key];
    }
  }

  return { toRemove, toUpdate, toAdd };
}

/**
 * Check if the given element object is a valid recursive element.
 * @param {Object} element
 * @returns {boolean}
 */
function isRecursiveElement(element) {
  return (
    typeof element === "object" &&
    element !== null &&
    hasProperty(element, "elementType") &&
    hasProperty(element, "$$_RecursiveSymbol") &&
    typeof element.elementType === "string" &&
    element.elementType.toString().trim() !== "" &&
    element.$$_RecursiveSymbol === RECURSIVE_ELEMENT_SYMBOL
  );
}

export { isValidChild, makeDiffList, isRecursiveElement };
