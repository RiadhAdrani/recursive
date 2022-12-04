import ContextStore from "../context/ContextStore";
import { Action } from "../task";
import { Component, ComponentAttribute, ComponentEvent } from "./Component";
import { CoreContext, CoreTasks } from "./types";

export abstract class Core<
  I = Record<string, unknown>,
  E = (ev: Record<string, unknown>) => void,
  S = Record<string, unknown>
> {
  public iteration = 0;

  public context: ContextStore<CoreContext<I, E, S>> = new ContextStore();

  public tasks: CoreTasks = {
    beforeUnmounted: [],
    committed: [],
    mounted: [],
    unmounted: [],
    updated: [],
  };

  addAction(type: keyof CoreTasks, action: Action) {
    this.tasks[type].push(action);
  }

  resetActions() {
    this.tasks = {
      beforeUnmounted: [],
      committed: [],
      mounted: [],
      unmounted: [],
      updated: [],
    };
  }

  abstract onComponentStyleUpdated(component: Component<I, E, S>): void;
  abstract onComponentAttributeAdded(
    name: string,
    value: ComponentAttribute,
    component: Component<I, E, S>
  ): void;
  abstract onComponentAttributeUpdated(
    name: string,
    value: ComponentAttribute,
    component: Component<I, E, S>
  ): void;
  abstract onComponentAttributeRemoved(name: string, component: Component<I, E, S>): void;
  abstract onComponentEventAdded(
    name: string,
    value: ComponentEvent<E>,
    component: Component<I, E, S>
  ): void;
  abstract onComponentEventUpdated(
    name: string,
    value: ComponentEvent<E>,
    component: Component<I, E, S>
  ): void;
  abstract onComponentEventRemoved(name: string, component: Component<I, E, S>): void;
  abstract onComponentChildPositionChanged(
    oldPos: number,
    newPos: number,
    component: Component<I, E, S>
  ): void;
  abstract onComponentChildAdded(
    child: Component<I, E, S>,
    pos: number,
    component: Component<I, E, S>
  ): void;
  abstract onComponentChildRemoved(pos: number): void;
  abstract onComponentReplaced(
    component: Component<I, E, S>,
    newComponent: Component<I, E, S>
  ): void;

  abstract isComponentRendered(component: Component<I, E, S>): boolean;
  abstract renderComponent(component: Component<I, E, S>): I;
}
