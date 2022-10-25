const { RecursiveConsole } = require("../console");
const {
    ROUTER_PATH_STATE,
    ROUTER_ROUTE_STATE,
    ROUTER_NOT_FOUND_ROUTE,
    ROUTER_ANCHOR_STATE,
} = require("../constants");
const {
    flattenRoute,
    resolvePath,
    stripPathAndAnchor,
    extractParams,
    findRouteOfForm,
    fragmentize,
} = require("./utility");
const { createRoute } = require("./route");

class RecursiveRouter {
    constructor(route, base, scroll, boostrapper) {
        /**
         * @type {import("../app").RecursiveApp}
         */
        this.boostrapper = boostrapper;

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
        this.routes = flattenRoute(route);

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

        if (this.routes[ROUTER_NOT_FOUND_ROUTE].redirectTo) {
            RecursiveConsole.error(
                "Recursive Router : The reserved '/404' route cannot have a redirection path."
            );
        }

        const fTemplate = this.routes["/"];

        if (!fTemplate) {
            RecursiveConsole.error("Recursive Router : The '/' root route was not found.");
        }

        this.stateManager.setReserved(ROUTER_PATH_STATE, "/");
        this.stateManager.setReserved(ROUTER_ROUTE_STATE, fTemplate);
        this.stateManager.setReserved(ROUTER_ANCHOR_STATE, "");

        this.useRouterNavigationListener();
    }

    get stateManager() {
        return this.boostrapper.stateManager;
    }

    get orchestrator() {
        return this.boostrapper.orchestrator;
    }

    getPathState() {
        return this.stateManager.getReserved(ROUTER_PATH_STATE);
    }

    getRouteState() {
        return this.stateManager.getReserved(ROUTER_ROUTE_STATE);
    }

    getAnchorState() {
        return this.stateManager.getReserved(ROUTER_ANCHOR_STATE);
    }

    /**
     * @param {string} path
     */
    goTo(path) {
        if (!path) return;

        const [newPath, routeForm, anchor] = resolvePath(path, this.routes);
        const [currentPath] = this.getPathState();
        resolvePath;
        /**
         * We should check if the wanted route
         * is a different from the current one.
         */
        if (currentPath !== newPath) {
            this.useRouterPushState(newPath, routeForm, anchor);

            this.mountNewRoute(newPath, routeForm, anchor);
        }
    }

    /**
     * @param {string} routePath
     * @param {string} routeAnchor
     */
    replace(routePath, routeAnchor) {
        if (!routePath) return;

        const [newPath, routeForm, anchor] = resolvePath(routePath, this.routes);

        if (newPath) {
            this.useRouterReplaceState(newPath, routeForm, anchor);

            this.mountNewRoute(newPath, routeForm, routeAnchor);
        }
    }

    getParams() {
        let params = {};

        const fragments = fragmentize(this.useRouterGetRoute());

        for (let i = 0; i < fragments.length; i++) {
            const path = "/" + fragments.slice(0, i + 1).join("/");

            const template = findRouteOfForm(path, this.routes);

            if (template) {
                params = { ...extractParams(template, path) };
            }
        }

        return params;
    }

    renderFragment() {
        const routerContext = this.routerContext;

        /**
         * If the current router context depth is superior to the length of the fragments list,
         * we know that we are out of context and we should return an empty string
         * which will not be added to the tree of component.
         */
        if (routerContext.depth > routerContext.fragments.length) return "";

        /**
         * Contains the value of the expected route path at the current context depth.
         * We assume that we are at a reasonable depth value.
         * @type {string}
         */
        const expected = routerContext.fragments
            .slice(0, routerContext.depth)
            .reduce((prev, val) => {
                return `${prev}${val}`;
            });

        const [routeForm] = stripPathAndAnchor(expected);

        const found = findRouteOfForm(routeForm, this.routes);

        return this.routes[found || "/404"].component();
    }

    renderRoute() {
        const setRouterContextParams = () => {
            const [route] = this.getPathState();

            this.routerContext.fragments = route
                .split("/")
                .slice(1)
                .map((val) => `/${val}`);
        };

        const useRouterContext = (context, componentCallback) => {
            if (typeof componentCallback !== "function") {
                RecursiveConsole.error("Route component is not a function.");
            }

            const startContext = (newContext) => {
                const routerContext = this.routerContext;

                routerContext.depth++;

                if (routerContext.context) {
                    routerContext.stack.push(routerContext.context);
                }

                routerContext.context = newContext;
            };

            const endContext = () => {
                const routerContext = this.routerContext;

                /**
                 * We check if a context already exists
                 */
                if (routerContext.context) {
                    /**
                     * if the stack is not empty,
                     * we set the current context to the previous one
                     * which we popped from the stack.
                     */
                    if (routerContext.stack.length > 0)
                        routerContext.context = routerContext.stack.pop();
                    /**
                     *  if the stack is empty
                     *  we set the context to an undefined state.
                     */ else routerContext.context = undefined;
                }

                routerContext.depth--;
            };

            startContext(context);

            const fragment = componentCallback();

            endContext();

            return fragment;
        };

        const [route] = this.getRouteState();

        setRouterContextParams();

        /**
         * We wrap the fragment rendering function within a context.
         */
        return useRouterContext({ route }, () => this.renderFragment());
    }

    resolvePath(path) {
        return resolvePath(path, this.routes);
    }

    getAnchor() {
        return this.getAnchorState()[0];
    }

    /**
     * @param {string} route
     * @returns {boolean}
     */
    isWithinRoute(route) {
        if (typeof route != "string") return false;

        const current = this.getPathState()[0];

        if (current === route) return true;

        const route_f = fragmentize(route);
        const current_f = fragmentize(current);

        if (route_f.length > current_f.length) return false;

        for (let i = 0; i < route_f.length; i++) {
            const c_route = "/" + route_f.slice(0, i + 1).join("/");
            const c_current = "/" + current_f.slice(0, i + 1).join("/");

            if (findRouteOfForm(c_current, this.routes) !== c_route) {
                console.log(findRouteOfForm(c_current, this.routes), c_route);
                return false;
            }
        }

        return true;
    }

    /**
     * @param {string} path
     * @param {import("../../lib").RouteTemplate} routeForm
     * @param {string} anchor
     */
    mountNewRoute(path, routeForm, anchor) {
        const [, setCurrentPath] = this.getPathState();
        const [currentRoute, setCurrentRoute] = this.getRouteState();
        const [, setCurrentAnchor] = this.getAnchorState();

        const routeTemplate = this.routes[routeForm];

        this.orchestrator.batchCallback(() => {
            if (typeof currentRoute.onExit == "function") {
                currentRoute.onExit();
            }

            setCurrentRoute(routeTemplate);
            setCurrentPath(path);
            setCurrentAnchor(anchor);

            if (typeof routeTemplate.onLoad == "function") {
                routeTemplate.onLoad();
            }
        });

        if (anchor) {
            this.useRouterGoToAnchor(anchor);
        } else {
            if (this.scroll) {
                this.useRouterScrollToTop();
            }
        }

        if (routeTemplate.title) {
            this.useRouterSetTitle(routeTemplate.title);
        }
    }

    /**
     * @param {string} path
     */
    useRouterMakeURL() {
        RecursiveConsole.error("useRouterMakeURL is not implemented");
    }

    useRouterGetLocationPath() {
        RecursiveConsole.error("useRouterGetLocationPath is not implemented");
    }

    /**
     * @param {string} destination
     * @param {string} routeForm
     * @param {string} hash
     */
    useRouterReplaceState() {
        RecursiveConsole.error("useRouterReplaceState is not implemented");
    }

    /**
     * @param {string} destination
     * @param {string} routeForm
     * @param {string} hash
     */
    useRouterPushState() {
        RecursiveConsole.error("useRouterPushState is not implemented");
    }

    useRouterScrollToTop() {
        RecursiveConsole.error("useRouterScrollToTop is not implemented");
    }

    /**
     * @param {string} anchor
     */
    useRouterGoToAnchor() {
        RecursiveConsole.error("useRouterGoToAnchor is not implemented");
    }

    useRouterNavigationListener() {
        RecursiveConsole.error("useRouterNavigationListener is not implemented");
    }

    useRouterGetRoute() {
        RecursiveConsole.error("useRouterGetRoute is not implemented");
    }

    useRouterOnLoad() {
        RecursiveConsole.error("useRouterOnLoad is not implemented");
    }

    /**
     * @param {string} title
     */
    useRouterSetTitle() {
        RecursiveConsole.error("useRouterSetTitle is not implemented");
    }
}

module.exports = { RecursiveRouter, createRoute };
