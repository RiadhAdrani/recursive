const { RecursiveConsole } = require("../console");
const {
    ROUTER_PATH_STATE,
    ROUTER_ROUTE_STATE,
    ROUTER_NOT_FOUND_ROUTE,
    ROUTER_DYNAMIC_REG_EXP,
} = require("../constants");
const { flattenRoute, resolvePath, stripPathAndAnchor, isDynamicRoute } = require("./utility");
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

    /**
     * @param {string} path
     */
    goTo(path) {
        if (!path) return;

        const [newPath, routeForm, anchor] = resolvePath(path, this.routes);
        const [currentPath] = this.getPathState();

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
        const regExp = ROUTER_DYNAMIC_REG_EXP;

        const [currentName] = this.getPathState();
        const current = isDynamicRoute(currentName, this.routes);

        /**
         * If the current route is not dynamic,
         * we return an empty object.
         */
        if (!current.isDynamic) return {};

        /**
         * We match the given template against router dynamic regular expression
         * and we extract he keys and the data.
         */
        const keys = current.template.path.match(regExp) || [];
        const data = this.useRouterGetLocationPath().match(regExp) || [];

        /**
         * If the lengths or the keys and data arrays are equal and not null,
         * It means that we have valid params.
         */
        if (keys.length === data.length && keys.length > 0) {
            const params = {};

            for (let i = 0; i < keys.length; i++) {
                /**
                 * for each index of the arrays,
                 * we remove the delimiter ":" and ";" from both the key and its data,
                 * because the dynamic route option should be of form "/:id;".
                 * and we add it to the output params.
                 */
                const key = keys[i].replace(":", "").replace(";", "");
                const keyData = data[i].replace(":", "").replace(";", "");

                params[key] = keyData;
            }

            return params;
        }

        return {};
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

        let [routeForm] = stripPathAndAnchor(expected);

        const isDynamic = isDynamicRoute(expected, this.routes);

        if (isDynamic.isDynamic) {
            routeForm = isDynamic.template.path;
        }

        /**
         * The appropriate fragment route
         * calculated using the `expected` route.
         */
        let fragmentRoute = this.routes[routeForm] || this.routes["/404"] || false;

        /**
         * Route fragment element.
         * This should be transformed by the renderer
         * into platform-specific component.
         * @type {import("../../lib").RecursiveElement}
         */
        let fragmentComponent;

        if (fragmentRoute) {
            fragmentComponent = fragmentRoute.isDynamic
                ? fragmentRoute.template.component()
                : fragmentRoute.component();
        } else {
            /**
             * This branch should be unreachable,
             */
            fragmentComponent = "";
        }

        return fragmentComponent;
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

    /**
     * @param {string} path
     * @param {import("../../lib").RouteTemplate} routeForm
     * @param {string} anchor
     */
    mountNewRoute(path, routeForm, anchor) {
        const [currentPath, setCurrentPath] = this.getPathState();
        const [currentRoute, setCurrentRoute] = this.getRouteState();

        const routeTemplate = this.routes[routeForm];

        this.orchestrator.batchCallback(() => {
            if (typeof currentRoute.onExit == "function") {
                currentRoute.onExit();
            }

            setCurrentRoute(routeTemplate);
            setCurrentPath(path);

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
    useRouterMakeURL(path) {
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
    useRouterReplaceState(destination, routeForm, hash) {
        RecursiveConsole.error("useRouterReplaceState is not implemented");
    }

    /**
     * @param {string} destination
     * @param {string} routeForm
     * @param {string} hash
     */
    useRouterPushState(destination, routeForm, hash) {
        RecursiveConsole.error("useRouterPushState is not implemented");
    }

    useRouterScrollToTop() {
        RecursiveConsole.error("useRouterScrollToTop is not implemented");
    }

    /**
     * @param {string} anchor
     */
    useRouterGoToAnchor(anchor) {
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
    useRouterSetTitle(title) {
        RecursiveConsole.error("useRouterSetTitle is not implemented");
    }
}

module.exports = { RecursiveRouter, createRoute };
