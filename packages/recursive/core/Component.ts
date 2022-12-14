import { hasProperty, isBlank, isFunction, isInInterval } from "@riadh-adrani/utility-js";
import { throwError } from "../helpers";
import { ComponentImplementation } from "./types";

export const ComponentSymbol = Symbol.for("recursive-component");

export type ComponentEvent<E> = (event: E) => void;

export type ComponentAttribute = string | number | boolean;

export type ComponentLifeCycleCallback = () => void;

export type ComponentCallback = <O>(options: O) => ComponentRawDeclaration;

export type ComponentOptions = {
  key?: string;
  options?: Record<string, unknown>;
} & Record<string, unknown>;

export type ComponentRawDeclaration = {
  __recursive__component__: symbol;
  componentType: string;
} & ComponentOptions;

export type ComponentDeclaration<E> = {
  __recursive__component__: symbol;
  componentType: string;
  key?: string;
  style: Record<string, unknown>;
  attributes: Record<string, ComponentAttribute>;
  events: Record<string, ComponentEvent<E>>;
  options: Record<string, unknown>;
  children: ComponentCallback[];
};

export function createComponentDeclaration(
  componentType: string,
  options: ComponentOptions
): ComponentRawDeclaration {
  if (isBlank(componentType)) throwError(`Invalid component type (${componentType})`);

  return {
    ...options,
    componentType,
    __recursive__component__: ComponentSymbol,
  };
}

export class Component<I, E> {
  public type: string;
  public parent?: Component<I, E>;
  public key?: string;
  public attributes: Record<string, ComponentAttribute> = {};
  public events: Record<string, ComponentEvent<E>> = {};
  public children: Component<I, E>[] = [];
  public instance?: I;
  public style?: Record<string, unknown>;
  public options: Record<string, unknown> = {};

  public implementation: ComponentImplementation<I, E>;

  get index(): number {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }

  get uid(): string {
    if (this.parent !== undefined) {
      return [this.parent.uid, this.index].join("-");
    } else {
      return "0";
    }
  }

  constructor(type: string, implementation: ComponentImplementation<I, E>) {
    this.implementation = implementation;
    this.type = type;
  }

  addAttribute(name: string, value: ComponentAttribute) {
    this.attributes[name] = value;

    this.implementation.attributes.add(this, name, value);
  }

  updateAttribute(name: string, value: ComponentAttribute) {
    if (!hasProperty(this.attributes, name)) {
      throwError(`attribute (${name}) does not exist.`, "Component");
      return;
    }

    this.attributes[name] = value;

    this.implementation.attributes.update(this, name, value);
  }

  removeAttribute(name: string) {
    if (!hasProperty(this.attributes, name)) {
      throwError(`attribute (${name}) does not exist.`, "Component");
      return;
    }

    delete this.attributes[name];

    this.implementation.attributes.remove(this, name);
  }

  addEvent(name: string, value: ComponentEvent<E>) {
    if (!isFunction(value)) {
      throwError(`event (${name}) is not a function.`, "Component");
      return;
    }

    this.events[name] = value;

    this.implementation.events.add(this, name, value);
  }

  updateEvent(name: string, value: ComponentEvent<E>) {
    if (!isFunction(value)) {
      throwError(`event (${name}) is not a function.`, "Component");
      return;
    }

    if (!hasProperty(this.events, name)) {
      throwError(`event (${name}) does not exist.`, "Component");
      return;
    }

    this.events[name] = value;

    this.implementation.events.update(this, name, value);
  }

  removeEvent(name: string) {
    if (!hasProperty(this.events, name)) {
      throwError(`event (${name}) does not exist.`, "Component");
      return;
    }

    delete this.events[name];

    this.implementation.events.remove(this, name);
  }

  changeChildPosition(oldPos: number, newPos: number) {
    if (!isInInterval(0, oldPos, this.children.length - 1)) {
      throwError("invalid old position", "Component");
    }

    if (!isInInterval(0, newPos, this.children.length - 1)) {
      throwError("invalid new position", "Component");
    }

    if (oldPos === newPos) return;

    const child = this.children.splice(oldPos, 1)[0];

    this.children.splice(newPos, 0, child);

    this.implementation.instance.changeChildPosition(this, oldPos, newPos);
  }

  removeChild(pos: number) {
    if (this.children.length < 1 || !isInInterval(0, pos, this.children.length - 1)) {
      throwError("invalid position", "Component");
      return;
    }

    const child = this.children.splice(pos, 1)[0];
    child.parent = undefined;

    child.implementation.instance.remove(child);
  }

  addChild__Test(child: Component<I, E>, pos = -1) {
    if (pos === -1) {
      this.children.push(child);
    } else {
      if (!isInInterval(0, pos, this.children.length)) {
        throwError("invalid position", "Component");
        return;
      }

      this.children.splice(pos, 0, child);
    }

    this.implementation.instance.addChild(this, child, pos);
  }

  addChild(child: Component<I, E>, pos = -1) {
    this.addChild__Test(child, pos);

    child.parent = this;
  }

  replace(component: Component<I, E>) {
    if (this.parent) {
      this.parent.children[this.index] = component;
      component.parent = this.parent;
    }

    this.implementation.instance.replace(this, component);
  }
}
