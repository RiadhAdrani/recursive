import RecursiveOrchestrator from "../core/recursive-orchestrator/RecursiveOrchestrator";
import RecursiveWebRenderer from "./recursive-web-renderer/RecursiveWebRenderer";
import RecursiveWebRouter from "./recursive-web-router/RecursiveWebRouter";
import RecursiveState from "../core/recursive-state/RecursiveState";
import { useRecursiveWindow } from "./recursive-window/RecursiveWindow.js";
import GlobalAttributes from "./types/GlobalAttributes";
import "./recursive-web-components/DefineElements.js";

let appRouter = undefined;
let appOrchestrator = undefined;
let appRenderer = undefined;
let appState = undefined;

function checkRouter(callback) {
    if (typeof callback !== "function") return;
    if (appRouter === undefined) return;

    return callback(appRouter);
}

function checkState(callback) {
    if (typeof callback !== "function") return;
    if (appState === undefined) return;

    return callback(appState);
}

function checkStyle(callback) {
    if (typeof callback !== "function") return;
    if (appRenderer.styler === undefined) return;

    return callback(appRenderer.styler);
}

/**
 * Create a route.
 * @param param
 * @returns
 */
function route({ path, component, title, routes, redirectTo }) {
    return { path, component, title, routes, redirectTo };
}

/**
 * Return the current route url path.
 * @returns
 */
function getRoute() {
    return checkRouter((router) => router.useRouterGetRoute());
}

/**
 * Return an object containing keyed values.
 * @returns
 */
function getParams() {
    return checkRouter((router) => router.getParams());
}

/**
 * Return the base of the router.
 * @returns {string} base
 */
function getBase() {
    return checkRouter((router) => router.base);
}

/**
 * Redirect the app to the provided path.
 * @param {string} path
 * @returns
 */
function goTo(path) {
    return checkRouter((router) => router.goTo(path));
}

/**
 * Return the appropriate component
 * @returns {any} component
 */
function renderRoute() {
    return checkRouter((router) => router.renderRoute());
}

function getState(key) {
    return checkState((stateManager) => stateManager.getState(key));
}

function setState(key, value, onInit, onRemoved) {
    return checkState((stateManager) => stateManager.setState(key, value, onInit, onRemoved));
}

function getCache(key) {
    return checkState((stateManager) => stateManager.getCache(key));
}

function setCache(key, value, onInit, onRemoved) {
    return checkState((stateManager) => stateManager.setCache(key, value, onInit, onRemoved));
}

function getRef(key, defaultValue = document.createElement("div")) {
    return checkState((stateManager) => stateManager.getRef(key, defaultValue));
}

function updateOn(callback) {
    appOrchestrator.batchCallback(callback, "update-on-" + Date.now());
}

function setStyle(cssObject) {
    checkStyle(() => {
        appRenderer.styler.setStyle(cssObject);
    });
}

const LinkProps = {
    ...GlobalAttributes,
    download: "",
    href: "",
    hrefLang: "",
    ping: "",
    referrerPolicy: "",
    rel: "",
    target: "",
    type: "",
};

/**
 * Create `<a>` element.
 * @param {typeof LinkProps} props
 */
function Link(props) {
    const el = { ...props, elementType: "a" };

    if (appRouter && el.href) {
        const _onClick = el.onClick || (() => {});
        el.href = appRouter.useRouterMakeURL(el.href);

        el.onClick = (e) => {
            e.preventDefault();

            appRouter.goTo(props.href);
            _onClick();
        };
    }

    return el;
}

/**
 * Render and inject the `app` inside the given `root`.
 */
function Render({ app, root, router = { route: undefined, base: "", scroll: false } }) {
    appOrchestrator = new RecursiveOrchestrator();
    appRenderer = new RecursiveWebRenderer(app, root);

    appState = new RecursiveState();
    appRouter = router.route
        ? new RecursiveWebRouter(
              router.route,
              router.base,
              router.scroll,
              appState,
              appOrchestrator
          )
        : undefined;

    appState.orchestrator = appOrchestrator;
    appOrchestrator.renderer = appRenderer;
    appRenderer.stateManager = appState;
    appRenderer.orchestrator = appOrchestrator;

    useRecursiveWindow(appOrchestrator);

    appRenderer.render();

    if (appRouter) appRouter.useRouterOnLoad();
}

export {
    Render,
    getBase,
    getParams,
    getRoute,
    Link,
    goTo,
    renderRoute,
    route,
    getState,
    setState,
    getCache,
    setCache,
    getRef,
    updateOn,
    setStyle,
};
