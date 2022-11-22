import { isFunction } from "@riadh-adrani/utility-js";

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

  public async contextualize<R>(callback: () => R, data: T): Promise<R> {
    if (!isFunction(callback)) {
      throw "Invalid context callback";
    }

    if (data === undefined) {
      throw "Invalid context data.";
    }

    this.start(data);
    const res = await callback();
    this.end();

    return res;
  }
}
