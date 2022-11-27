import { hasProperty, isFunction, isInInterval } from "@riadh-adrani/utility-js";
import { throwError } from "../helpers";

export type ComponentEvent<E> = (event: E) => void;
export type ComponentAttribute = string | number | boolean;

export class Component<I, E, S> {
  public type: string;
  public parent?: Component<I, E, S>;
  public key?: string;
  public attributes: Record<string, ComponentAttribute> = {};
  public events: Record<string, ComponentEvent<E>> = {};
  public children: Component<I, E, S>[] = [];
  public instance?: I;
  public style?: S;
  public options: Record<string, unknown> = {};

  public onAttributeAdded?: (name: string, value: ComponentAttribute) => void;
  public onAttributeUpdated?: (name: string, value: ComponentAttribute) => void;
  public onAttributeRemoved?: (name: string) => void;
  public onEventAdded?: (name: string, value: ComponentEvent<E>) => void;
  public onEventUpdated?: (name: string, value: ComponentEvent<E>) => void;
  public onEventRemoved?: (name: string) => void;
  public onChildPositionChanged?: (oldPos: number, newPos: number) => void;
  public onChildRemoved?: (pos: number) => void;
  public onChildAdded?: (child: Component<I, E, S>, pos: number) => void;
  public onReplaced?: (component: Component<I, E, S>) => void;

  get index(): number {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }

  get uid(): string {
    if (this.index !== undefined && this.parent !== undefined) {
      return [this.parent.uid, this.index].join("-");
    } else {
      return "0";
    }
  }

  constructor(type: string) {
    this.type = type;
  }

  addAttribute(name: string, value: ComponentAttribute) {
    this.attributes[name] = value;

    this.onAttributeAdded?.(name, value);
  }

  updateAttribute(name: string, value: ComponentAttribute) {
    if (!hasProperty(this.attributes, name)) {
      throwError(`attribute (${name}) does not exist.`, "Component");
      return;
    }

    this.attributes[name] = value;

    this.onAttributeAdded?.(name, value);
  }

  removeAttribute(name: string) {
    if (!hasProperty(this.attributes, name)) {
      throwError(`attribute (${name}) does not exist.`, "Component");
      return;
    }

    delete this.attributes[name];

    this.onAttributeRemoved?.(name);
  }

  addEvent(name: string, value: ComponentEvent<E>) {
    if (!isFunction(value)) {
      throwError(`event (${name}) is not a function.`, "Component");
      return;
    }

    this.events[name] = value;

    this.onEventAdded?.(name, value);
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

    this.onEventUpdated?.(name, value);
  }

  removeEvent(name: string) {
    if (!hasProperty(this.events, name)) {
      throwError(`event (${name}) does not exist.`, "Component");
      return;
    }

    delete this.events[name];

    this.onEventRemoved?.(name);
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

    this.onChildPositionChanged?.(oldPos, newPos);
  }

  removeChild(pos: number) {
    if (this.children.length < 1 || !isInInterval(0, pos, this.children.length - 1)) {
      throwError("invalid position", "Component");
      return;
    }

    const child = this.children.splice(pos, 1)[0];
    child.parent = undefined;

    this.onChildRemoved?.(pos);
  }

  addChild__Test(child: Component<I, E, S>, pos = -1) {
    if (pos === -1) {
      this.children.push(child);
    } else {
      if (!isInInterval(0, pos, this.children.length)) {
        throwError("invalid position", "Component");
        return;
      }

      this.children.splice(pos, 0, child);
    }

    this.onChildAdded?.(child, pos);
  }

  addChild(child: Component<I, E, S>, pos = -1) {
    this.addChild__Test(child, pos);

    child.parent = this;
  }

  replace(component: Component<I, E, S>) {
    if (this.parent) {
      this.parent.children[this.index] = component;
      component.parent = this.parent;
    }

    this.onReplaced?.(component);
  }
}
