const { RecursiveConsole } = require("../console");
const { RecursiveOrchestrator } = require("../orchestrator");
const { RecursiveRenderer } = require("../renderer");
const { RecursiveRouter } = require("../router");
const { RecursiveState } = require("../state");

/**
 * ## `Recursive app boostrapper`
 */
class RecursiveApp {
    constructor({ renderer, buildRouter = () => {}, cacheSize = 1000, onAppInit = () => {} }) {
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
            } else {
                RecursiveConsole.error("Router is not of type RecursiveRouter.");
            }
        } else {
            RecursiveConsole.error("Router is not of type RecursiveRouter.");
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

    render() {
        this.renderer.render();

        this.router.useRouterOnLoad();
    }

    /**
     * Helper function to create route template.
     * @param {import("../../lib").Route} params
     * @returns {import("../../lib").Route}
     */
    route(params) {
        return arguments[0];
    }

    getRoute() {
        return this.router.useRouterGetRoute();
    }

    getParams() {
        return this.router.getParams();
    }

    getBase() {
        return this.router.base;
    }

    goTo(path) {
        this.router.goTo(path);
    }

    renderRoute() {
        return this.router.renderRoute();
    }

    getState(key) {
        return this.stateManager.getState(key);
    }

    setState(key, value, onInit, onRemoved) {
        return this.stateManager.setState(...arguments);
    }

    getCache(key) {
        return this.stateManager.getCache(key);
    }

    setCache(key, value, onInit, onRemoved) {
        return this.stateManager.setCache(...arguments);
    }

    getRef(key) {
        return this.stateManager.getRef(key);
    }

    updateOn(callback) {
        this.orchestrator.batchCallback(callback, "update-on-" + Date.now());
    }
}

module.exports = { RecursiveApp };
