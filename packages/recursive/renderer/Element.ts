import {
  areEqual,
  hasProperty,
  isArray,
  isBlank,
  isDefined,
  isNull,
  isObject,
} from "@riadh-adrani/utility-js";
import { RECURSIVE_ELEMENT_SYMBOL } from "../constants";
import { Flags } from "./Flags";
import { Hooks } from "./Hooks";

export interface RecursiveRawElement extends Record<string, unknown> {
  elementType: string;
  $$_RecursiveSymbol: symbol;
}

export interface RecursiveElement<A, E, N> extends RecursiveRawElement {
  id: string;
  instance: N;
  attributes: Record<string, A>;
  events: Record<string, E>;
  style: Record<string, unknown>;
  flags: Flags;
  hooks: Hooks<N>;
  parent?: RecursiveElement<A, E, N>;
  children: Array<RecursiveElement<A, E, N>>;
}

export function createElement(
  elementType: string,
  props: Record<string, unknown>
): RecursiveRawElement {
  return {
    ...props,
    elementType,
    $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
  };
}

export function isChild(child: unknown): boolean {
  if (isArray(child) || isNull(child) || !isDefined(child) || isBlank(child as string)) {
    return false;
  }

  return true;
}

export function isElement(element: unknown): boolean {
  return (
    isObject(element) &&
    hasProperty(element, "elementType") &&
    hasProperty(element, "$$_RecursiveSymbol") &&
    (element as Record<string, unknown>).$$_RecursiveSymbol === RECURSIVE_ELEMENT_SYMBOL &&
    !isArray(element) &&
    !isNull(element) &&
    !isBlank((element as Record<string, unknown>).elementType as string)
  );
}

export type DiffResult = {
  remove: Record<string, unknown>;
  update: Record<string, unknown>;
  add: Record<string, unknown>;
};

export function diff(
  oldList: Record<string, unknown>,
  newList: Record<string, unknown>
): DiffResult {
  const remove: Record<string, unknown> = {};
  const update: Record<string, unknown> = {};
  const add: Record<string, unknown> = {};

  let combined: Record<string, unknown> = {};

  if (isObject(oldList) && !isArray(oldList)) {
    combined = { ...combined, ...oldList };
  }

  if (isObject(newList) && !isArray(newList)) {
    combined = { ...combined, ...newList };
  }

  for (const key in combined) {
    if (hasProperty(newList, key)) {
      if (hasProperty(oldList, key)) {
        if (!areEqual(oldList[key], newList[key])) {
          update[key] = combined[key];
        }
      } else if (!hasProperty(oldList, key)) {
        add[key] = combined[key];
      }
    } else {
      remove[key] = combined[key];
    }
  }

  return { remove, update, add };
}
