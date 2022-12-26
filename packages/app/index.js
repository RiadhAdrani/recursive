import { RecursiveConsole } from "../console";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveRenderer } from "../renderer";
import { RecursiveRouter } from "../router";
import { RecursiveState } from "../state";

export class RecursiveApp {
  /**
   * create a new recursive app instance.
   * @param {import(".").RecursiveAppConstructorParams} param0
   */
  constructor({ buildRenderer, buildRouter, cacheSize = 1000, onAppInit }) {
    /**
     * @type {RecursiveRouter}
     */
    this.router = null;

    /**
     * @type {RecursiveRenderer}
     */
    this.renderer = null;

    /**
     * @type {RecursiveOrchestrator}
     */
    this.orchestrator = new RecursiveOrchestrator(this);

    /**
     * @type {RecursiveState}
     */
    this.stateManager = new RecursiveState(this);

    if (typeof buildRenderer !== "function") {
      RecursiveConsole.error("Recursive App : buildRenderer is not a function.");
    } else {
      let builtRenderer = buildRenderer(this);

      if (builtRenderer instanceof RecursiveRenderer) {
        this.renderer = builtRenderer;
      } else {
        RecursiveConsole.error("Renderer is not of type RecursiveRenderer.");
      }
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
  }

  /**
   * @param {string} elementType
   * @param {object} props
   * @deprecated
   * @returns
   */
  createElement(elementType, props) {
    return this.renderer.createElement(elementType, props);
  }

  /**
   * @param {import("../../lib").BaseElement} element
   */
  renderElement(element) {
    const recursiveEl = this.renderer.prepareElement(element, "1", null);

    return this.renderer.renderInstance(recursiveEl);
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

  getAnchor() {
    if (this.router) {
      return this.router.getAnchor();
    } else {
      RecursiveConsole.error(
        "Recursive Router : You can not use the method 'getAnchor()' because no Router has been initialized."
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
        "Recursive Router : You can not use the method 'renderRoute()' because no Router has been initialized."
      );
    }
  }

  isWithinRoute(parentRoute) {
    if (this.router) {
      return this.router.isWithinRoute(parentRoute);
    } else {
      RecursiveConsole.error(
        "Recursive Router : You can not use the method 'isWithinRoute()' because no Router has been initialized."
      );
    }
  }

  /**
   * @param {string} key
   * @returns {import("../../lib").StateArray}
   */
  getState(key) {
    return this.stateManager.getState(key);
  }

  /**
   * @param {string} key
   * @param {any} value
   * @param {() => Function} onInit
   * @param {() => void} onRemoved
   * @returns {import("../../lib").StateArray}
   */
  setState(key, value, onInit, onRemoved) {
    return this.stateManager.setState(key, value, onInit, onRemoved);
  }

  /**
   * @param {string} key
   * @returns {import("../../lib").StateArray}
   */
  getCache(key) {
    return this.stateManager.getCache(key);
  }

  /**
   * @param {string} key
   * @param {any} value
   * @param {() => Function} onInit
   * @param {() => void} onRemoved
   * @returns {import("../../lib").StateArray}
   */
  setCache(key, value, onInit, onRemoved) {
    return this.stateManager.setCache(key, value, onInit, onRemoved);
  }

  /**
   * @param {string} key
   * @param {any} defaultValue
   * @returns {any}
   */
  getRef(key, defaultValue) {
    return this.stateManager.getRef(key, defaultValue);
  }

  /**
   * @param {() => void} callback
   */
  updateOn(callback) {
    this.orchestrator.batchCallback(callback, "update-on-" + Date.now());
  }

  /**
   * @param {string} key
   * @param {Array<any>} dependencies
   * @param {() => void} callback
   */
  setEffect(key, dependencies, callback) {
    this.stateManager.setEffect(key, callback, dependencies);
  }
}
