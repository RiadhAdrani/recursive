/**
 * Execute synchronous callbacks within a `context`.
 */
class RecursiveContext {
    /**
     * Create new context store instance.
     */
    constructor() {
        this.context = undefined;
        this.stack = [];
    }

    /**
     * Retrieve the current context's data.
     * @returns {any} data
     */
    get() {
        return this.context;
    }

    /**
     * Start context by pushing its data into the `stack`.
     * @param {any} data
     */
    startContext(data) {
        if (this.context != undefined) {
            this.stack.push(this.context);
        }
        this.context = data;
    }

    /**
     * End the current context.
     */
    endCurrentContext() {
        if (this.context) {
            if (this.stack.length > 0) this.context = this.stack.pop();
            else this.context = undefined;
        }
    }

    /**
     * Apply context to the given function callback.
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

module.exports = { RecursiveContext };
