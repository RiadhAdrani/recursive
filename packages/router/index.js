const { RecursiveConsole } = require("../console");
const { ROUTER_PATH_STATE, ROUTER_ROUTE_STATE, ROUTER_NOT_FOUND_ROUTE } = require("../constants");
const flattenRoutes = require("./src/flattenRoutes");
const renderFragment = require("./src/renderFragment");
const renderRoute = require("./src/renderRoute");
const replace = require("./src/replace");
const resolvePath = require("./src/resolveInputRoute");
const mountNewRoute = require("./src/mountNewRoute");

class RecursiveRouter {
    constructor(route, base, scroll, boostrapper) {
        this.boostrapper = boostrapper;

        this.base = base || "";

        this.scroll = scroll || false;

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

    replace(path, hash) {
        replace(path, hash, this);
    }

    getParams() {
        const regExp = ROUTER_DYNAMIC_REG_EXP;

        const [currentName] = this.getPathState();
        const current = isDynamicRoute(currentName, router);

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
        return renderFragment(this);
    }

    renderRoute() {
        return renderRoute(this);
    }

    resolvePath(path) {
        return resolvePath(path, this.routes);
    }

    mountNewRoute(path, route, anchor) {
        mountNewRoute(path, route, anchor, this);
    }

    useRouterMakeURL(path) {
        RecursiveConsole.error("useRouterMakeURL is not implemented");
    }

    useRouterGetLocationPath() {
        RecursiveConsole.error("useRouterGetLocationPath is not implemented");
    }

    useRouterReplaceState(destination, routeForm, hash) {
        RecursiveConsole.error("useRouterReplaceState is not implemented");
    }

    useRouterPushState(destination, routeForm, hash) {
        RecursiveConsole.error("useRouterPushState is not implemented");
    }

    useRouterScrollToTop() {
        RecursiveConsole.error("useRouterScrollToTop is not implemented");
    }

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

    useRouterSetTitle(title) {
        RecursiveConsole.error("useRouterSetTitle is not implemented");
    }
}

module.exports = { RecursiveRouter };
