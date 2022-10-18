import { RecursiveElement, StateArray } from "../../lib";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveRenderer } from "../renderer";
import { RecursiveRouter } from "../router";
import { RecursiveState } from "../state";

export interface RecursiveAppConstructorParams {
    /**
     * maximum number of cached states.
     */
    cacheSize: number;
    /**
     * application renderer.
     */
    buildRenderer: (app: RecursiveApp) => RecursiveRenderer;
    /**
     * a method returning the application router.
     * The `RecursiveRouter` cannot be initialized without
     * an instance of `RecursiveOrchestrator` and `RecursiveState`.
     */
    buildRouter: (app: RecursiveApp) => RecursiveRouter;
    /**
     * a callback that will execute when the app is initialized,
     * but before the rendering phase.
     */
    onAppInit: (app: RecursiveApp) => void;
}

/**
 * Recursive Application Bootstrapper.
 */
export class RecursiveApp {
    public orchestrator: RecursiveOrchestrator;
    public stateManager: RecursiveState;
    public router: RecursiveRouter;
    public renderer: RecursiveRenderer;

    /**
     * Create a new Recursive Application instance.
     * @param params application parameters.
     */
    constructor(params: RecursiveAppConstructorParams);

    /**
     * Create a new element.
     *
     * This method is deprecated,
     * use `createElement` from the renderer package instead.
     *
     * @param {string} elementType Element type.
     * @param {object} props Element properties.
     * @deprecated
     * @returns {RecursiveElement} Recursive Element.
     */
    createElement(elementType: string, props: object): RecursiveElement;

    /**
     * Inject the resulting Recursive Element from the `app` callback
     * into the supplied container.
     *
     * @throws when the returned object from the callback is not a Recursive element.
     */
    render(): void;

    /**
     * Retrieve the current route as string.
     * @throws an error when the router is not initialized.
     *
     * @returns {string} Route path.
     */
    getRoute(): string;

    /**
     * return the currently targeted anchor.
     *
     * @throws an error when the router is not initialized.
     */
    getAnchor(): string;

    /**
     * Calculate the parameters of the current path and returns them as a key-value object.
     * @throws an error when the router is not initialized.
     *
     * @returns {object} Parameters.
     */
    getParams(): object;

    /**
     * Return the base of the application.
     * @throws an error when the router is not initialized.
     * @returns {string} Base as string.
     */
    getBase(): string;

    /**
     * Change the current route and trigger an update if needed.
     * @throws an error when the router is not initialized.
     * @param {string} path Destination path.
     */
    goTo(path: string): void;

    /**
     * Used to inject a route component into the elements tree.
     *
     * Could be used recursively within nested routes to render the appropriate components.
     *
     * @throws an error when the router is not initialized.
     * @returns The current route fragment element.
     */
    renderRoute(): RecursiveElement;

    /**
     * Retrieve an existing stateful object from the `state` store if it exists.
     * @param {string} key identifier
     * @throw an error if the state does not exist.
     * @returns {StateArray} state as an array.
     */
    getState(key: string): StateArray;

    /**
     * Create and save a stateful object in the `state` store within the global `StateStore`.
     *
     * Objects created by this method are deleted when they are not used or called in a rendering iteration.
     * @param {string} key unique identifier of the state within its store.
     * @param {any} value initial value
     * @param {Function} onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param {Function} onRemoved a function that will execute when the state has been destroyed.
     * @returns {StateArray} state as an Array
     */
    setState<T>(
        key: string,
        value: T,
        onInit: () => Function,
        onRemoved: () => void
    ): StateArray<T>;

    /**
     * Retrieve an existing stateful object from the `cache` store if it exists.
     * @param {string} key identifier
     * @throw an error if the state does not exist.
     * @returns {StateArray} state as an array.
     */
    getCache(key: string): StateArray<any>;

    /**
     * Create and save a stateful object in the `cache` store within the global `StateStore`.
     *
     * Objects created by this method are not deleted when they are not used,
     * unless the number of cached object exceed the maximum allocated size which is by default `1000`.
     *
     * Older states will be deleted first.
     *
     * @param {string} key unique identifier of the state within its store.
     * @param {any} value initial value
     * @param {Function} onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param {Function} onRemoved a function that will execute when the state has been destroyed.
     * @returns {StateArray} state as an array.
     */
    setCache<T>(
        key: string,
        value: T,
        onInit: () => Function,
        onRemoved: () => void
    ): StateArray<T>;

    /**
     * Retrieve an existing element from the `reference` store, or the default value.
     *
     * Use the `hooks.onRef` hook and return a string from the function to initialize a new reference:
     *
     * ```js
     * createElement("div",{
     *      hooks:{
     *          // onRef is executed every time the App updates.
     *          onRef:() => "my-ref";
     *      }
     *  });
     *
     * // use this function later like this :
     *
     * const ref = getRef("my-ref");
     *
     * ```
     * @param {string} key identifier
     * @returns {any} Native Element
     */
    getRef<T>(key: string, defaultValue: T): T;

    /**
     * Execute an effect.
     * @param {string} key identifier.
     * @param {Function} callback callback to be executed.
     * @param {Array} dependencies effect dependencies that will decide if the effect should be called again.
     */
    setEffect(key: string, dependencies: Array<any>, callback: () => Function): void;

    /**
     * Batch update made within the callback.
     *
     * Used generally to state update after an asynchronous call.
     *
     * ### ``The callback function should not be an asynchronous function.``
     *
     * ```js
     * // ✅ Correct use
     * const data = await getData();
     * updateOn(() => {
     *      setState1(data.value1);
     *      setState2(data.value2);
     * })
     *
     * // ❌ Bad use
     * // can cause unexpected behavior
     * updateOn(async () => {
     *      const data = await getData();
     *
     *      setState1(data.value1);
     *      setState2(data.value2);
     *
     * })
     * ```
     *
     * @param {Function} callback callback that will be executed.
     */
    updateOn(callback: () => void): void;
}
