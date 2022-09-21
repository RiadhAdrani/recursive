const { RecursiveConsole } = require("../console");
const { ROUTER_PATH_STATE, ROUTER_ROUTE_STATE, ROUTER_NOT_FOUND_ROUTE } = require("../constants");
const flattenRoutes = require("./src/flattenRoutes");
const renderRoute = require("./src/renderRoute");
const replace = require("./src/replace");
const resolvePath = require("./src/resolveInputRoute");
const stripPathAndAnchor = require("./src/stripPathAndAnchor");

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

    isDynamicRoute(inputPath) {
        const regExp = ROUTER_DYNAMIC_REG_EXP;

        for (let pathKey in this.routes) {
            /**
             * Basically,
             * this is the path that we are testing,
             * we are using a new variable
             * to avoid confusion.
             * the name `pathKey` could be interpreted as something else,
             * despite being just the key of the path within the object of routes.
             */
            const templatePath = pathKey;

            /**
             * This is a testing string,
             * could be set to any value
             * but we decided "recusive".
             */
            const tester = "recursive";

            /**
             * We match the given input path against the dynamic route regular expression.
             */
            const inputRouteMatch = inputPath.match(regExp);
            /**
             * We match the currently iterated on path against the dynamic route regular expression.
             */
            const currentRouteMatch = pathKey.match(regExp);

            /**
             * If one of the matches is falsy,
             * we just skip this route.
             */
            if (!currentRouteMatch || !inputRouteMatch) continue;

            /**
             * This may cause errors
             * and we should wrap it in an "try catch" block.
             */
            try {
                if (
                    inputRouteMatch.length === currentRouteMatch.length &&
                    currentRouteMatch.length > 0
                ) {
                    /**
                     * If the number of matches is the same and not null,
                     * we should check if both routes give us the same route
                     * with a custom parameter.
                     * We return the route template if it is a match.
                     */
                    if (
                        inputPath.replace(regExp, tester) === templatePath.replace(regExp, tester)
                    ) {
                        return { isDynamic: true, template: this.routes[pathKey] };
                    }
                }
            } catch (e) {
                /**
                 * Something went wrong...
                 */
            }
        }

        /**
         * Our route is not dynamic
         */
        return { isDynamic: false };
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

        const isDynamic = this.isDynamicRoute(expected);

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
        return renderRoute(this);
    }

    resolvePath(path) {
        return resolvePath(path, this.routes);
    }

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
