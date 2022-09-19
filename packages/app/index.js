const { RecursiveConsole } = require("../console");
const { RecursiveOrchestrator } = require("../orchestrator");
const { RecursiveRenderer } = require("../renderer");
const { RecursiveRouter } = require("../router");
const { RecursiveState } = require("../state");

class RecursiveApp {
    constructor({ renderer, buildRouter, cacheSize = 1000, onAppInit }) {
        this.orchestrator = new RecursiveOrchestrator();
        this.stateManager = new RecursiveState();
        this.router = null;
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

    createElement(elementType, props) {
        return this.renderer.createElement(elementType, props);
    }

    render() {
        this.renderer.render();

        if (this.router) {
            this.router.useRouterOnLoad();
        }
    }

    getRoute() {
        if (this.router) {
            return this.router.useRouterGetRoute();
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'getRoute()' because no Router has been initialized."
            );
        }
    }

    getParams() {
        if (this.router) {
            return this.router.getParams();
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'getParams()' because no Router has been initialized."
            );
        }
    }

    getBase() {
        if (this.router) {
            return this.router.base;
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'getBase()' because no Router has been initialized."
            );
        }
    }

    goTo(path) {
        if (this.router) {
            this.router.goTo(path);
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'goTo()' because no Router has been initialized."
            );
        }
    }

    renderRoute() {
        if (this.router) {
            return this.router.renderRoute();
        } else {
            RecursiveConsole.error(
                "Recursive Router : You can not use the method 'goTo()' because no Router has been initialized."
            );
        }
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

    setEffect(key, dependencies, callback) {
        this.stateManager.setEffect(key, callback, dependencies);
    }
}

module.exports = { RecursiveApp };
