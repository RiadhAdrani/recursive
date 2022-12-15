import ContextStore from "../context/ContextStore";
import { useId } from "../helpers";
import { Action } from "../task";
import { Component, ComponentCallback, ComponentRawDeclaration } from "./Component";
import { Orchestrator } from "./Orchestrator";
import { INTERNAL_COLLECTION, REFERENCE_COLLECTION, STATE_COLLECTION, Store } from "./Store";
import { Callback, CoreContext, CoreTasks, RecursiveImplementation, StateArray } from "./types";

export class Core<I = Record<string, unknown>, E = (ev: Record<string, unknown>) => void> {
  public iteration = 0;
  public tree?: Component<I, E> = undefined;

  public implementation?: RecursiveImplementation<I, E>;

  public context: ContextStore<CoreContext<I, E>> = new ContextStore();

  public orchestrator: Orchestrator = new Orchestrator({
    commit: () => {
      //
    },
    compute: () => {
      //
    },
  });

  public store: Store = new Store(() => {
    this.orchestrator.requestUpdate({ id: useId(), source: "state-update" });
  });

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

  get componentOptions() {
    return {};
  }

  setState<T = unknown>(key: string, value: T, onCreated?: Callback): StateArray<T> {
    const global = this.context.get() === undefined;

    return this.store.collections[STATE_COLLECTION].set({ key, value, global, onCreated });
  }

  getState<T = unknown>(key: string): StateArray<T> {
    return this.store.collections[STATE_COLLECTION].get(key);
  }

  setEffect(key: string, callback: Callback, dependencies = []): void {
    this.store.addEffect(key, callback, dependencies);
  }

  setInternal<T = unknown>(key: string, value: T, onCreated?: Callback): StateArray<T> {
    return this.store.collections[INTERNAL_COLLECTION].set({ key, value, global: true, onCreated });
  }

  getInternal<T = unknown>(key: string): StateArray<T> {
    return this.store.collections[INTERNAL_COLLECTION].get(key);
  }

  setRef(key: string, value: I) {
    this.store.collections[REFERENCE_COLLECTION].set({ key, value, global: false });
  }

  getRef<T = I>(key: string): T {
    return this.store.collections[REFERENCE_COLLECTION].get<T>(key)[0];
  }

  extractRawComponent(callback: ComponentCallback): ComponentRawDeclaration {
    return callback(this.componentOptions);
  }
}
