const { RecursiveConsole } = require("../console");
const { ROUTER_PATH_STATE, ROUTER_ROUTE_STATE, ROUTER_NOT_FOUND_ROUTE } = require("../constants");
const { RecursiveOrchestrator } = require("../orchestrator");
const { RecursiveState } = require("../state");
const checkRoute = require("./src/checkRoute");
const flattenRoutes = require("./src/flattenRoutes");
const getParams = require("./src/getParams");
const goTo = require("./src/goTo");
const loadRoute = require("./src/loadRoute");
const renderFragment = require("./src/renderFragment");
const renderRoute = require("./src/renderRoute");
const replace = require("./src/replace");

/**
 * ### `RecursiveRouter`
 * Create an instance of the Recursive Router.
 *
 * These methods should be implemented, otherwise they will throw `errors`.
 * * `useRouterMakeURL`
 * * `useRouterGetLocationPath`
 * * `useRouterReplaceState`
 * * `useRouterPushState`
 * * `useRouterScrollToTop`
 * * `useRouterGoToAnchor`
 * * `useRouterNavigationListener`
 * * `useRouterGetRoute`
 * * `useRouterOnLoad`
 * * `useRouterSetTitle`
 */
class RecursiveRouter {
    /**
     * Create an instance of the Recursive Router
     * @param {import("../../lib").Route} route
     * @param {string} base
     * @param {boolean} scroll
     */
    constructor(route, base, scroll, stateManager, orchestrator) {
        /**
         * @type {RecursiveState}
         */
        this.stateManager = stateManager;

        /**
         * @type {RecursiveOrchestrator}
         */
        this.orchestrator = orchestrator;

        /**
         * @type {string}
         */
        this.base = base || "";

        /**
         * @type {boolean}
         */
        this.scroll = scroll || false;

        /**
         * @type {import("../../lib").FlatRoutes}
         */
        this.routes = flattenRoutes(route);

        this.routerContext = {
            context: undefined,
            stack: [],
            depth: 0,
            fragments: [],
            anchor: "",
        };

        if (!this.routes[ROUTER_NOT_FOUND_ROUTE]) {
            this.routes[ROUTER_NOT_FOUND_ROUTE] = {
                path: ROUTER_NOT_FOUND_ROUTE,
                title: "Not Found",
                component: () => "404 Not Found",
            };
        }

        const fTemplate = this.routes["/"];

        this.stateManager.setReserved(ROUTER_PATH_STATE, "/");
        this.stateManager.setReserved(ROUTER_ROUTE_STATE, fTemplate);

        this.useRouterNavigationListener();
    }

    /**
     * Load the appropriate route with the given parameters.
     * @param {Object} templateRoute
     * @param {string} path
     * @param {string} anchor
     * @returns
     */
    loadRoute(templateRoute, path, anchor) {
        loadRoute(templateRoute, path, anchor, this);
    }

    getPathState() {
        return this.stateManager.getReserved(ROUTER_PATH_STATE);
    }

    getRouteState() {
        return this.stateManager.getReserved(ROUTER_ROUTE_STATE);
    }

    /**
     * Check the route for an anchor.
     * @param {string} path
     * @returns
     */
    checkRoute(path) {
        return checkRoute(path, this);
    }

    /**
     * Used to navigate between routes.
     * @param {path} path
     * @returns
     */
    goTo(path) {
        goTo(path, this);
    }

    /**
     * Replace the current route with the given one.
     * @param {string} path
     * @param {string} hash
     * @returns
     */
    replace(path, hash) {
        replace(path, hash, this);
    }

    /**
     * Return the parameters of the current route.
     * @returns
     */
    getParams() {
        return getParams(this);
    }

    /**
     * Return the component matching the current context.
     * @returns {any} component
     */
    renderFragment() {
        return renderFragment(this);
    }

    /**
     * Combine `useRouterContext` and `renderFragment`.
     * Render the route fragment to the tree.
     * @returns
     */
    renderRoute() {
        return renderRoute(this);
    }

    /**
     * Build the URL.
     * @param {string} path
     */
    useRouterMakeURL(path) {
        RecursiveConsole.error("useRouterMakeURL is not implemented");
    }

    /**
     * Retreive the current path.
     */
    useRouterGetLocationPath() {
        RecursiveConsole.error("useRouterGetLocationPath is not implemented");
    }

    /**
     * Replace the current route state.
     * @param {string} route
     */
    useRouterReplaceState(route) {
        RecursiveConsole.error("useRouterReplaceState is not implemented");
    }

    /**
     * Push another route state.
     * @param {string} route
     * @param {string} hash
     */
    useRouterPushState(route, hash) {
        RecursiveConsole.error("useRouterPushState is not implemented");
    }

    /**
     * Scroll to the top of the device view.
     */
    useRouterScrollToTop() {
        RecursiveConsole.error("useRouterScrollToTop is not implemented");
    }

    /**
     * Scroll to the location of the element identified by the given anchor.
     * @param {string} anchor
     */
    useRouterGoToAnchor(anchor) {
        RecursiveConsole.error("useRouterGoToAnchor is not implemented");
    }

    /**
     * Attach a listener that watches the actions of pushing and replacing route states
     */
    useRouterNavigationListener() {
        RecursiveConsole.error("useRouterNavigationListener is not implemented");
    }

    /**
     * Get the current route
     */
    useRouterGetRoute() {
        RecursiveConsole.error("useRouterGetRoute is not implemented");
    }

    /**
     * Executed when the router has been initialized in the App.
     */
    useRouterOnLoad() {
        RecursiveConsole.error("useRouterOnLoad is not implemented");
    }

    /**
     * Change the tab title of the browser.
     */
    useRouterSetTitle(title) {
        RecursiveConsole.error("useRouterSetTitle is not implemented");
    }
}

module.exports = { RecursiveRouter };
