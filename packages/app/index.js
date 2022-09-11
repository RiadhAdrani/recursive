const { RecursiveConsole } = require("../console");
const { RecursiveOrchestrator } = require("../orchestrator");
const { RecursiveRenderer } = require("../renderer");
const { RecursiveRouter } = require("../router");
const { RecursiveState } = require("../state");

/**
 * Recursive Application Bootstrapper.
 */
class RecursiveApp {
    /**
     * Create a new Recusive Application instance.
     * @param {object} params Parameters.
     * @param {RecursiveRenderer} params.renderer Application renderer.
     * @param {(app : RecursiveApp) => RecursiveRouter} params.buildRouter A callback returning the router of the application.
     * @param {number} params.cacheSize The maximum allowed number of stored cache objects.
     * @param {(app : RecursiveApp) => void} params.onAppInit Callback executed after the app has been initialized.
     */
    constructor({ renderer, buildRouter, cacheSize = 1000, onAppInit }) {
        /**
         * @type {RecursiveOrchestrator}
         */
        this.orchestrator = new RecursiveOrchestrator();

        /**
         * @type {RecursiveState}
         */
        this.stateManager = new RecursiveState();

        /**
         * @type {RecursiveRouter}
         */
        this.router = null;

        /**
         * @type {RecursiveRenderer}
         */
        this.renderer = null;

        if (renderer instanceof RecursiveRenderer) {
            this.renderer = renderer;
        } else {
            RecursiveConsole.error("Renderer is not of type RecursiveRenderer.");
        }

        if (typeof buildRouter == "function") {
            let builtRouter = buildRouter(this);

            if (builtRouter instanceof RecursiveRouter) {
                this.router = builtRouter;
            }
        }

        if (typeof cacheSize == "number" && cacheSize != this.stateManager.cacheSize) {
            this.stateManager.cacheSize = cacheSize;
        }

        if (typeof onAppInit == "function") {
            onAppInit(this);
        }

        this.stateManager.orchestrator = this.orchestrator;
        this.orchestrator.renderer = this.renderer;
        this.renderer.stateManager = this.stateManager;
        this.renderer.orchestrator = this.orchestrator;
    }

    /**
     * Create a new element.
     *
     * @param {string} elementType Element type.
     * @param {object} props Element properties.
     * @returns {import("../../lib").RecursiveElement} Recursive Element.
     */
    createElement(elementType, props) {
        return this.renderer.createElement(elementType, props);
    }

    /**
     * Inject the resulting Recursive Element from the `app` callback
     * into the supplied container.
     *
     * @throws when the returned object from the callback is not a Recursive element.
     */
    render() {
        this.renderer.render();

        if (this.router) {
            this.router.useRouterOnLoad();
        }
    }

    /**
     * Create a route tree object.
     * @param {import("../../lib").Route} params Route properties.
     *
     * @returns {import("../../lib").Route} Route.
     */
    route(params) {
        return arguments[0];
    }

    /**
     * Retrieve the current route as string.
     * @throws an error when the router is not initialized.
     *
     * @returns {string} Route path.
     */
    getRoute() {
        if (this.router) {
            return this.router.useRouterGetRoute();
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'getRoute()' because no Router has been initialized."
            );
        }
    }

    /**
     * Calculate the parameters of the current path and returns them as a key-value object.
     * @throws an error when the router is not initialized.
     *
     * @returns {object} Parameters.
     */
    getParams() {
        if (this.router) {
            return this.router.getParams();
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'getParams()' because no Router has been initialized."
            );
        }
    }

    /**
     * Return the base of the application.
     * @throws an error when the router is not initialized.
     *
     * @returns {string} Base as string.
     */
    getBase() {
        if (this.router) {
            return this.router.base;
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'getBase()' because no Router has been initialized."
            );
        }
    }

    /**
     * Change the current route and trigger an update if needed.
     * @throws an error when the router is not initialized.
     * @param {string} path Destination path.
     */
    goTo(path) {
        if (this.router) {
            this.router.goTo(path);
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'goTo()' because no Router has been initialized."
            );
        }
    }

    /**
     * Used to inject a route component into the elements tree.
     *
     * Could be used recursively within nested routes to render the appropriate components.
     *
     * @throws an error when the router is not initialized.
     * @returns {import("../../lib").RecursiveElement} The current route fragment element.
     */
    renderRoute() {
        if (this.router) {
            return this.router.renderRoute();
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'goTo()' because no Router has been initialized."
            );
        }
    }

    /**
     * Retrieve an existing stateful object from the `state` store if it exists.
     * @param {string} key identifier
     * @throw an error if the state does not exist.
     * @returns {import("../../lib").StateArray} StateArray
     */
    getState(key) {
        return this.stateManager.getState(key);
    }

    /**
     * Create and save a stateful object in the `state` store within the global `StateStore`.
     *
     * Objects created by this method are deleted when they are not used or called in a rendering iteration.
     * @param {string} key unique identifier of the state whithin its store.
     * @param {any} value initial value
     * @param {Function} onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param {Function} onRemoved a function that will execute when the state has been destroyed.
     * @returns {import("../../lib").StateArray} StateArray
     */
    setState(key, value, onInit, onRemoved) {
        return this.stateManager.setState(...arguments);
    }

    /**
     * Retrieve an existing stateful object from the `cache` store if it exists.
     * @param {string} key identifier
     * @throw an error if the state does not exist.
     * @returns {import("../../lib").StateArray} StateArray
     */
    getCache(key) {
        return this.stateManager.getCache(key);
    }

    /**
     * Create and save a stateful object in the `cache` store within the global `StateStore`.
     *
     * Objects created by this method are not deleted when they are not used,
     * unless the number of cached object exceed the maximum allocated size which is by default `1000`.
     *
     * Older states will be deleted first.
     *
     * @param {string} key unique identifier of the state whithin its store.
     * @param {any} value initial value
     * @param {Function} onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param {Function} onRemoved a function that will execute when the state has been destroyed.
     * @returns {import("../../lib").StateArray} StateArray
     */
    setCache(key, value, onInit, onRemoved) {
        return this.stateManager.setCache(...arguments);
    }

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
     * ```
     * @param {string} key identifier
     * @returns {any} Native Element
     */
    getRef(key) {
        return this.stateManager.getRef(key);
    }

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
    updateOn(callback) {
        this.orchestrator.batchCallback(callback, "update-on-" + Date.now());
    }

    /**
     * Execute an effect.
     * @param {string} key identifier.
     * @param {Function} callback callback to be executed.
     * @param {Array<>} dependencies effect dependencies that will decide if the effect should be called again.
     */
    setEffect(key, callback, dependencies) {
        this.stateManager.setEffect(key, callback, dependencies);
    }
}

module.exports = { RecursiveApp };
