/**
 * Execute synchronous callbacks within a `context`.
 */
export class RecursiveContext {
    public context: any;
    public stack: Array<any>;

    constructor() {}

    /**
     * Retrieve the current context's data.
     * @returns {any} data
     */
    get(): any;

    /**
     * Start context by pushing its data into the `stack`.
     * @param data context data.
     */
    startContext(data: any): void;

    /**
     * End the current context
     */
    endCurrentContext(): void;

    /**
     * Apply context to the given function callback.
     * @param callback method to be executed within a context.
     * @param data context data.
     */
    useContext<T>(callback: () => T, data: any): T;
}
