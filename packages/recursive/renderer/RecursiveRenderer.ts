import { RecursiveApp } from "../app";
import { diff, isElement, RecursiveElement, RecursiveRawElement } from "./Element";
import { ContextStore } from "../context";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveStateManager } from "../state";
import {
  hasProperty,
  isArray,
  isBlank,
  isDefined,
  isEmpty,
  isFunction,
  isNull,
  isString,
} from "@riadh-adrani/utility-js";
import { RError } from "../console";
import {
  ELEMENT_TYPE_FRAGMENT,
  ELEMENT_TYPE_RAW,
  ELEMENT_TYPE_TEXT_NODE,
  RECURSIVE_ELEMENT_SYMBOL,
} from "../constants";
import { hooks, Hooks, HookType } from "./Hooks";
import { flags, Flags, FlagType } from "./Flags";

export type AppFunction = () => RecursiveRawElement;

export type RecursiveRendererParams<E> = {
  root: E;
  fn: AppFunction;
  app: RecursiveApp;
};

export type Callback = () => void;

export type RecursiveRendererPhases = {
  onCreated: Array<Callback>;
  onUpdated: Array<Callback>;
  onBeforeDestroyed: Array<Callback>;
  onDestroyed: Array<Callback>;
  onCommit: Array<Callback>;
};

export abstract class RecursiveRenderer<A = unknown, E = unknown, N = unknown> {
  public app: RecursiveApp;
  public fn: AppFunction;
  public root: E;

  public phases: RecursiveRendererPhases = {
    onBeforeDestroyed: [],
    onCommit: [],
    onCreated: [],
    onDestroyed: [],
    onUpdated: [],
  };

  public tree?: RecursiveElement<A, E, N>;

  public context: ContextStore<unknown> = new ContextStore();

  constructor({ app, fn, root }: RecursiveRendererParams<E>) {
    if (!isFunction(fn)) {
      throw new RError("(fn) is not a function");
    }

    if (!isDefined(app)) {
      throw new RError("(app) is not a defined");
    }

    if (!isDefined(root)) {
      throw new RError("(root) is not a defined");
    }

    this.app = app;
    this.fn = fn;
    this.root = root;
  }

  get orchestrator(): RecursiveOrchestrator {
    return this.app.orchestrator;
  }

  get stateManager(): RecursiveStateManager {
    return this.app.stateManager;
  }

  addCallback(phase: keyof RecursiveRendererPhases, callback: Callback): void {
    if (!hasProperty(this.phases, phase) || !isFunction(callback)) {
      throw new RError("Invalid phase name or callback.");
    }

    this.phases[phase].push(callback);
  }

  runPhase(phase: keyof RecursiveRendererPhases): void {
    if (!hasProperty(this.phases, phase)) {
      throw new RError("Invalid phase name.");
    }

    for (const callback of this.phases[phase]) {
      if (isFunction(callback)) callback();
    }
  }

  onUpdated(element: RecursiveElement<A, E, N>): void {
    if (!isFunction(element.hooks?.onUpdated)) return;

    this.addCallback("onUpdated", () => element.hooks?.onUpdated?.(element.instance));
  }

  onCreated(element: RecursiveElement<A, E, N>): void {
    if (!isFunction(element.hooks?.onCreated)) return;

    this.addCallback("onCreated", () => element.hooks?.onCreated?.(element.instance));
  }

  onBeforeDestroyed(element: RecursiveElement<A, E, N>): void {
    if (!isFunction(element.hooks?.beforeDestroyed)) return;

    this.addCallback("onBeforeDestroyed", () => element.hooks?.beforeDestroyed?.(element.instance));
  }

  onDestroyed(element: RecursiveElement<A, E, N>): void {
    if (!isFunction(element.hooks?.onDestroyed)) return;

    this.addCallback("onDestroyed", () => element.hooks?.onDestroyed?.());
  }

  renderInstance(element: RecursiveElement<A, E, N>): N {
    element.instance = this.useCreateInstance(element);

    for (const attr in element.attributes) {
      this.useAddAttribute(attr, element.attributes[attr], element);
    }

    for (const ev in element.events) {
      this.useAddEvent(ev, element.events[ev], element);
    }

    if (element.style) {
      this.useAddStyle(element.style, element);
    }

    if (element.elementType !== ELEMENT_TYPE_RAW) {
      for (const child of element.children) {
        this.useAdd(child, element);
      }
    }

    this.onCreated(element);

    return element.instance;
  }

  replaceElement(element: RecursiveElement<A, E, N>, newElement: RecursiveElement<A, E, N>): void {
    this.onBeforeDestroyed(element);

    this.addCallback("onCommit", () => this.useReplace(element, newElement));

    this.onDestroyed(element);

    newElement.instance = element.instance;
  }

  addElement(
    element: RecursiveElement<A, E, N>,
    parentElement: RecursiveElement<A, E, N>,
    index = -1
  ): void {
    if (!isElement(element)) return;

    this.addCallback("onCommit", () => this.useAdd(element, parentElement, index));

    this.onCreated(element);
  }

  changeElementPosition(element: RecursiveElement<A, E, N>, position: number): void {
    this.addCallback("onCommit", () => this.useChangePosition(element, position));
  }

  removeElement(element: RecursiveElement<A, E, N>): void {
    this.onBeforeDestroyed(element);

    this.addCallback("onCommit", () => this.useRemove(element));

    this.onDestroyed(element);
  }

  updateEvents(element: RecursiveElement<A, E, N>, newElement: RecursiveElement<A, E, N>): void {
    const combined = diff(element.events, newElement.events);

    for (const key in combined.update) {
      this.addCallback("onCommit", () => this.useUpdateEvent(key, newElement.events[key], element));
    }

    for (const key in combined.add) {
      this.addCallback("onCommit", () => this.useAddEvent(key, newElement.events[key], element));
    }

    for (const key in combined.remove) {
      this.addCallback("onCommit", () => this.useRemoveEvent(key, element));
    }
  }

  updateAttributes(
    element: RecursiveElement<A, E, N>,
    newElement: RecursiveElement<A, E, N>
  ): void {
    const combined = diff(element.attributes, newElement.attributes);

    for (const key in combined.update) {
      this.addCallback("onCommit", () =>
        this.useUpdateAttribute(key, newElement.attributes[key], element)
      );
    }

    for (const key in combined.add) {
      this.addCallback("onCommit", () =>
        this.useAddAttribute(key, newElement.attributes[key], element)
      );
    }

    for (const key in combined.remove) {
      this.addCallback("onCommit", () => this.useRemoveAttribute(key, element));
    }
  }

  updateChildren(element: RecursiveElement<A, E, N>, newElement: RecursiveElement<A, E, N>) {
    const updateEqualChildren = (
      oldChildren: Array<RecursiveElement<A, E, N>>,
      newChildren: Array<RecursiveElement<A, E, N>>
    ) => {
      for (let i = 0; i < oldChildren.length; i++) {
        this.updateChildren(oldChildren[i], newChildren[i]);
      }
    };

    for (const i in element.children) {
      if (this.useItemInTree(element.children[i])) {
        this.replaceElement(element, newElement);
        return;
      }
    }

    if (element.children.length === newElement.children.length) {
      updateEqualChildren(element.children, newElement.children);
    } else if (element.children.length > newElement.children.length) {
      while (element.children.length > newElement.children.length) {
        this.removeElement(element.children.pop() as RecursiveElement<A, E, N>);

        updateEqualChildren(element.children, newElement.children);
      }
    } else {
      for (let i = element.children.length; i < newElement.children.length; i++) {
        this.addElement(newElement.children[i], element);
      }

      updateEqualChildren(element.children, newElement.children.slice(0, element.children.length));
    }
  }

  updateElement(element: RecursiveElement<A, E, N>, newElement: RecursiveElement<A, E, N>): void {
    const instance = element.instance;

    if (!instance) {
      throw new RError(
        "Instance of the element not found, this error should not occur unless you are modifying the tree directly."
      );
    }

    if (element.flags?.forceRerender || newElement.flags?.forceRerender) {
      this.replaceElement(element, newElement);
    } else if (element.elementType !== newElement.elementType) {
      this.replaceElement(element, newElement);
    } else if (
      element.elementType === ELEMENT_TYPE_TEXT_NODE &&
      newElement.elementType === ELEMENT_TYPE_TEXT_NODE
    ) {
      this.useUpdateText(element, newElement);
    } else {
      this.useUpdateStyle(element, newElement);

      if (element.elementType === ELEMENT_TYPE_RAW) {
        // TODO raw container update
      } else {
        this.updateChildren(element, newElement);
      }
    }

    newElement.instance = instance;
  }

  setReference(element: RecursiveElement<A, E, N>): void {
    if (element.hooks?.onRef) {
      const res = element.hooks.onRef(element.instance);

      if (isString(res)) {
        // TODO setRef
      }
    }

    element.children.forEach((child) => this.setReference(child));
  }

  prepareChild(
    child: unknown,
    id: string,
    parent: RecursiveElement<A, E, N>
  ): RecursiveElement<A, E, N> | undefined {
    if (isNull(child) || !isDefined(child) || (isString(child) && isEmpty(child as string))) return;

    if (!hasProperty(child, "elementType")) {
      return {
        $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
        attributes: {},
        children: [child as RecursiveElement<A, E, N>],
        elementType: ELEMENT_TYPE_TEXT_NODE,
        events: {},
        flags: {},
        hooks: {},
        id: "-1",
        instance: undefined as N,
        style: {},
        parent,
      };
    }
    const elChild = child as RecursiveRawElement;

    if (
      hasProperty(child, "flags") &&
      hasProperty(elChild.flags, "renderIf") &&
      (elChild.flags as Flags).renderIf === false
    ) {
      return;
    } else {
      return this.prepareElement(child as RecursiveRawElement, id, parent);
    }
  }

  prepareElement(
    element: RecursiveRawElement,
    id: string,
    parent?: RecursiveElement<A, E, N>
  ): RecursiveElement<A, E, N> {
    const { $$_RecursiveSymbol, elementType } = element;

    if ($$_RecursiveSymbol !== RECURSIVE_ELEMENT_SYMBOL) {
      throw new RError("Invalid element schema.");
    }

    if (isBlank(elementType)) {
      throw new RError("Invalid element type.");
    }

    const computed: RecursiveElement<A, E, N> = {
      id,
      $$_RecursiveSymbol,
      elementType,
      events: {},
      attributes: {},
      children: [],
      parent,
      instance: undefined as N,
      flags: {},
      hooks: {},
      style: {},
    };

    for (const property in element) {
      if (property === "flags") {
        const elementFlags = element.flags as Flags;

        for (const flag in elementFlags) {
          if (flags.is(flag)) {
            computed.flags[flag as FlagType] = elementFlags[flag as FlagType];
          }
        }

        continue;
      }

      if (property === "hooks") {
        const elementHooks = element.hooks as Hooks<unknown>;

        for (const hook in elementHooks) {
          if (hooks.is(hook)) {
            computed.hooks[hook as HookType] = elementHooks[hook as HookType] as () => void;
          }
        }

        continue;
      }

      if (property === "children") {
        if (!isArray(element.children)) {
          const computedChild = this.prepareChild(element.children, `${id}-0`, computed);

          if (computedChild) {
            computed.children.push(computed);
          }
        } else {
          (element.children as Array<unknown>).forEach((child, index) => {
            const childId = `${id}-${index}`;

            const computedChild = this.prepareChild(child, childId, computed);

            if (!computedChild) return;

            if (computedChild.elementType === ELEMENT_TYPE_FRAGMENT) {
              computed.children.push(...computedChild.children);
            } else {
              if (isElement(computedChild)) {
                computed.children.push(computedChild);
              }
            }
          });
        }

        continue;
      }

      if (this.useIsEvent(property, element[property] as E)) {
        computed.events[property] = element[property] as E;
        continue;
      }

      if (this.useIsAttribute(property, element[property] as A)) {
        computed.attributes[property] = element[property] as A;
        continue;
      }
    }

    return computed;
  }

  computedTree(): RecursiveElement<A, E, N> {
    const tree = this.prepareElement(this.fn(), "0", undefined);

    if (!isElement(tree)) {
      throw new RError("Invalid element");
    }

    return tree;
  }

  clear() {
    this.stateManager.clear();
    this.phases = {
      onBeforeDestroyed: [],
      onCommit: [],
      onCreated: [],
      onDestroyed: [],
      onUpdated: [],
    };
    this.useClear();
  }

  render() {
    this.orchestrator.setStatus.compute();
    this.tree = this.computedTree();
    this.useOnTreePrepared(this.tree);

    this.orchestrator.setStatus.committing();
    this.useRenderTree();
    this.runPhase("onCreated");
    this.setReference(this.tree);
    this.stateManager.runEffects();

    this.orchestrator.setStatus.cleaning();
    this.clear();

    this.orchestrator.setStatus.free();
  }

  update() {
    this.orchestrator.setStatus.compute();

    const newTree = this.computedTree();
    this.useOnTreePrepared(newTree);

    this.orchestrator.setStatus.diffing();
    this.updateElement(this.tree as RecursiveElement<A, E, N>, newTree);
    this.tree = newTree;

    this.orchestrator.setStatus.committing();
    this.runPhase("onBeforeDestroyed");
    this.runPhase("onCommit");
    this.runPhase("onDestroyed");
    this.runPhase("onUpdated");
    this.runPhase("onCreated");
    this.setReference(this.tree);
    this.stateManager.runEffects();

    this.orchestrator.setStatus.cleaning();
    this.clear();

    this.orchestrator.setStatus.free();
  }

  abstract useUpdateText(
    oldElement: RecursiveElement<A, E, N>,
    newElement: RecursiveElement<A, E, N>
  ): void;

  abstract useClear(): void;

  abstract useOnTreePrepared(tree: RecursiveElement<A, E, N>): void;

  abstract useItemInTree(element: RecursiveElement<A, E, N>): boolean;

  abstract useIsAttribute(attribute: string, value: A): boolean;
  abstract useRemoveAttribute(attribute: string, element: RecursiveElement<A, E, N>): void;
  abstract useAddAttribute(attribute: string, value: A, element: RecursiveElement<A, E, N>): void;
  abstract useUpdateAttribute(
    attribute: string,
    value: A,
    element: RecursiveElement<A, E, N>
  ): void;

  abstract useIsEvent(event: string, value: E): boolean;
  abstract useRemoveEvent(event: string, element: RecursiveElement<A, E, N>): void;
  abstract useAddEvent(event: string, value: E, element: RecursiveElement<A, E, N>): void;
  abstract useUpdateEvent(event: string, value: E, element: RecursiveElement<A, E, N>): void;

  abstract useRenderTree(): void;

  abstract useAddStyle(style: Record<string, unknown>, oldElement: RecursiveElement<A, E, N>): void;
  abstract useUpdateStyle(
    oldElement: RecursiveElement<A, E, N>,
    newElement: RecursiveElement<A, E, N>
  ): void;

  abstract useChangePosition(element: RecursiveElement<A, E, N>, position: number): void;
  abstract useGetPosition(element: RecursiveElement<A, E, N>): number;
  abstract useRemove(element: RecursiveElement<A, E, N>): void;
  abstract useAdd(
    element: RecursiveElement<A, E, N>,
    parent: RecursiveElement<A, E, N>,
    position?: number
  ): void;
  abstract useReplace(
    element: RecursiveElement<A, E, N>,
    newElement: RecursiveElement<A, E, N>
  ): void;
  abstract useCreateInstance(element: RecursiveElement<A, E, N>): N;
}
