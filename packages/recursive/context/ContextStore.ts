import { isFunction } from "@riadh-adrani/utility-js";
import { RError } from "../console";

export default class ContextStore<T> {
  private current?: T;
  private stack: T[] = [];

  get(): T | undefined {
    return this.current;
  }

  getStack(): T[] {
    return this.stack;
  }

  private start(data: T): void {
    if (this.current != undefined) {
      this.stack.push(this.current);
    }

    this.current = data;
  }

  private end(): void {
    if (this.current != undefined) {
      if (this.stack.length > 0) this.current = this.stack.pop();
      else this.current = undefined;
    }
  }

  public contextualize<R>(callback: () => R, data: T): R {
    if (!isFunction(callback)) {
      throw new RError("Invalid context callback");
    }

    if (data === undefined) {
      throw new RError("Invalid context data.");
    }

    this.start(data);
    const res = callback();
    this.end();

    return res;
  }
}
