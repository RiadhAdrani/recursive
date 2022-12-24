import { hasProperty } from "@riadh-adrani/utility-js";
import { RError } from "../console";
import ContextStore from "./ContextStore";

export default class Context {
  public stores: Record<string, ContextStore<unknown>> = {};

  private findStore<T = unknown>(id: string): ContextStore<T> {
    if (hasProperty(this.stores, id)) {
      return this.stores[id] as ContextStore<T>;
    } else {
      throw new RError("Could not find store.");
    }
  }

  public async contextualizeNamed<T, R>(callback: () => R, id: string, data: T): Promise<R> {
    return await this.findStore<T>(id).contextualize(callback, data);
  }

  public getNamed<T>(id: string): T | undefined {
    return this.findStore<T>(id).get();
  }

  public addStore<T>(id: string, store: ContextStore<T>): void {
    if (hasProperty(this.stores, id)) {
      throw new RError("Store exists already");
    }

    this.stores[id] = store;
  }
}
