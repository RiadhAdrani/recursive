export class RecursiveContext {
  constructor() {
    this.context = undefined;
    this.stack = [];
  }

  get() {
    return this.context;
  }

  /**
   * @param {any} data
   */
  startContext(data) {
    if (this.context != undefined) {
      this.stack.push(this.context);
    }
    this.context = data;
  }

  endCurrentContext() {
    if (this.context) {
      if (this.stack.length > 0) this.context = this.stack.pop();
      else this.context = undefined;
    }
  }

  /**
   * @param {Function} callback
   * @param {any} data
   */
  useContext(callback, data) {
    if (typeof callback != "function") return;

    this.startContext(data);
    const result = callback();
    this.endCurrentContext();

    return result;
  }
}
