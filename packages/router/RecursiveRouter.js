import { throwError } from "../error";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveState } from "../state";

/**
 * ### `RecursiveRouter`
 * Create an instance of the Recursive Router.
 * * These methods should be implemented, otherwise they will throw `errors`
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
    static dynamicRegExp = /:[^:;]*;/g;
    static anchorRegExp = /#[a-zA-Z0-9-._~:?#\[\]\@!$&'()*+,;=]{1,}$/gm;

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
        this.routes = this.flattenRoutes(route);

        this.routerContext = {
            context: undefined,
            stack: [],
            depth: 0,
            fragments: [],
            anchor: "",
        };

        if (!this.routes["/404"]) {
            this.routes["/404"] = {
                path: "/404",
                title: "Not Found",
                component: () => "404 Not Found",
            };
        }

        const fTemplate = this.routes["/"];

        this.stateManager.setReserved("path", "/");
        this.stateManager.setReserved("route", fTemplate);

        this.useRouterNavigationListener();
    }

    /**
     * Resolve the provided route and return a flat object.
     * @param {import("../../lib").Route} route
     * @returns
     */
    flattenRoutes(route) {
        let list = {};

        if (route && route.path && route.component) {
            list[route.path] = {
                path: route.path,
                component: route.component,
                redirectTo: route.redirectTo,
                title: route.title,
                onLoad: route.onLoad,
                onExit: route.onExit,
            };

            if (Array.isArray(route.routes)) {
                const parent = route.path;
                const slash = route.path == "/" ? "" : "/";

                route.routes.forEach((_route) => {
                    if (_route && _route.path) {
                        const current = _route.path;

                        _route.path = parent + slash + current;

                        const _list = this.flattenRoutes(_route);
                        list = { ...list, ..._list };
                    }
                });
            }
        }

        return list;
    }

    /**
     * Check if the provided route is dynamic : contains parameters.
     * @param {string} route
     * @returns
     */
    isDynamicRoute(route) {
        const regExp = RecursiveRouter.dynamicRegExp;

        for (let path in this.routes) {
            const template = path.toString();
            const tester = "recursive";

            const rm = route.match(regExp);
            const tm = path.match(regExp);

            if (!tm || !rm) continue;

            try {
                if (rm.length === tm.length && tm.length > 0) {
                    if (route.replace(regExp, tester) === template.replace(regExp, tester)) {
                        return { isDynamic: true, template: this.routes[path] };
                    }
                }
            } catch (e) {
                console.log(`current route => ${template} vs ${route}`, this.routes, e);
            }
        }

        return { isDynamic: false };
    }

    /**
     * Resolve and prepare the route.
     * @param {string} route
     * @returns
     */
    resolveRoute(route) {
        const dynamicTemplate = this.isDynamicRoute(route);

        if (dynamicTemplate.isDynamic) {
            // route is dynamic
            return { path: route, route: dynamicTemplate.template };
        } else {
            // route is not dynamic
            if (this.routes[route]) {
                if (this.routes[route].redirectTo) {
                    // route should re direct
                    const _redirectRoute = this.routes[route].redirectTo;

                    const _redirect = this.isDynamicRoute(_redirectRoute);

                    if (_redirect.isDynamic) {
                        // redirect route is dynamic render it
                        return {
                            path: _redirectRoute,
                            route: _redirect.template,
                        };
                    } else {
                        // redirect route is not dynamic
                        if (this.routes[_redirectRoute]) {
                            // route found
                            return {
                                path: _redirectRoute,
                                route: this.routes[_redirectRoute],
                            };
                        } else {
                            // route not found, render 404
                            return {
                                path: _redirectRoute,
                                route: this.routes["/404"],
                            };
                        }
                    }
                } else {
                    // route should render as is
                    return { path: route, route: this.routes[route] };
                }
            } else {
                // route not found, render 404
                return { path: route, route: this.routes["/404"] };
            }
        }
    }

    /**
     * Find the match of the route
     * @param {string} route
     * @returns
     */
    findMatch(route) {
        const res = this.isDynamicRoute(route);

        if (res.isDynamic) return res;

        for (let _route in this.routes) {
            if (route === _route) return this.routes[_route];
        }

        return this.routes["/404"];
    }

    /**
     * Load the appropriate route with the given parameters.
     * @param {Object} template
     * @param {string} route
     * @param {string} anchor
     * @returns
     */
    loadRoute(template, route, anchor) {
        const [path, setPath] = this.stateManager.getReserved("path");
        const [current, setCurrent] = this.stateManager.getReserved("route");

        if (path === route) return;

        let _template = template;

        this.orchestrator.batchCallback(() => {
            if (typeof current.onExit === "function") current.onExit();

            if (typeof template.title === "string") this.useRouterSetTitle(template.title);

            setCurrent(_template);
            setPath(route);

            if (typeof _template.onLoad === "function") _template.onLoad();
        });

        if (anchor) {
            this.useRouterGoToAnchor(anchor);
        } else {
            this.useRouterScrollToTop();
        }
    }

    /**
     * Check the route for an anchor.
     * @param {string} path
     * @returns
     */
    checkRoute(path) {
        if (path !== "/") {
            path = path.replace(/\/$/, "");
        }

        const anchorRegEx = RecursiveRouter.anchorRegExp;

        let anchor = "";

        const res = anchorRegEx.exec(path);

        if (res) anchor = res[0];

        if (anchor) path = path.replace(anchor, "");

        const [current] = this.stateManager.getReserved("route");

        if (current === path) {
            if (anchor) {
                this.useRouterGoToAnchor(anchor);
            }

            return [false, ""];
        }

        return [this.resolveRoute(path), anchor];
    }

    /**
     * Used to navigate between routes.
     * @param {path} path
     * @returns
     */
    goTo(path) {
        if (!path) return;

        const [_route, anchor] = this.checkRoute(path);

        if (_route) {
            this.useRouterPushState(_route);

            this.loadRoute(_route.route, path, anchor);
        }
    }

    /**
     * Replace the current route with the given one.
     * @param {string} path
     * @param {string} hash
     * @returns
     */
    replace(path, hash) {
        if (!path) return;

        const [_route, anchor] = this.checkRoute(path);

        if (_route) {
            this.useRouterPushState(_route, hash);

            this.loadRoute(_route.route, path, hash);
        }
    }

    /**
     * Return the parameters of the current route.
     * @returns
     */
    getParams() {
        const regExp = RecursiveRouter.dynamicRegExp;

        const [currentName] = this.stateManager.getReserved("path");
        const current = this.isDynamicRoute(currentName);

        if (!current.isDynamic) return {};

        const keys = current.template.path.match(regExp) || [];
        const data = this.useRouterGetLocationPath().match(regExp) || [];

        if (keys.length === data.length && keys.length > 0) {
            const comb = {};

            for (let i = 0; i < keys.length; i++) {
                comb[keys[i].replace(":", "").replace(";", "")] = data[i]
                    .replace(":", "")
                    .replace(";", "");
            }

            return comb;
        }
    }

    /**
     * Start a new router context.
     * @param {any} newContext
     */
    startContext(newContext) {
        const routerContext = this.routerContext;

        routerContext.depth++;

        if (routerContext.context) {
            routerContext.stack.push(routerContext.context);
        }

        routerContext.context = newContext;
    }

    /**
     * end the current router context.
     * @param {any} newContext
     */
    endContext() {
        const routerContext = this.routerContext;

        if (routerContext.context) {
            if (routerContext.stack.length > 0) routerContext.context = routerContext.stack.pop();
            else routerContext.context = undefined;
        }

        routerContext.depth--;
    }

    /**
     * Encapsulate the given component with the appropriate context.
     * @param {any} context
     * @param {any} component
     * @returns
     */
    useRouterContext(context, component) {
        if (typeof component !== "function") {
            throwError("Route component is not a function.");
        }

        this.startContext(context);
        const fragment = component();
        this.endContext();

        return fragment;
    }

    /**
     * Set parameter for the `routerContext`.
     */
    setParams() {
        const [route] = this.stateManager.getReserved("path");

        this.routerContext.fragments = route
            .split("/")
            .slice(1)
            .map((val) => `/${val}`);
    }

    /**
     * Return the component matching the current context.
     * @returns {any} component
     */
    renderFragment() {
        const routerContext = this.routerContext;

        if (routerContext.depth > routerContext.fragments.length) return "";

        const expected = routerContext.fragments
            .slice(0, routerContext.depth)
            .reduce((prev, val) => {
                return `${prev}${val}`;
            });

        const fragment = this.findMatch(expected);

        if (fragment) {
            return fragment.isDynamic ? fragment.template.component() : fragment.component();
        } else "";
    }

    /**
     * Combine `useRouterContext` and `renderFragment`.
     * Render the route fragment to the tree.
     * @returns
     */
    renderRoute() {
        const [route] = this.stateManager.getReserved("route");
        this.setParams();

        return this.useRouterContext({ route }, () => this.renderFragment());
    }

    /**
     * Build the URL.
     * @param {string} path
     */
    useRouterMakeURL(path) {
        throwError("useRouterMakeURL is not implemented");
    }

    /**
     * Retreive the current path.
     */
    useRouterGetLocationPath() {
        throwError("useRouterGetLocationPath is not implemented");
    }

    /**
     * Replace the current route state.
     * @param {string} route
     */
    useRouterReplaceState(route) {
        throwError("useRouterReplaceState is not implemented");
    }

    /**
     * Push another route state.
     * @param {string} route
     * @param {string} hash
     */
    useRouterPushState(route, hash) {
        throwError("useRouterPushState is not implemented");
    }

    /**
     * Scroll to the top of the device view.
     */
    useRouterScrollToTop() {
        throwError("useRouterScrollToTop is not implemented");
    }

    /**
     * Scroll to the location of the element identified by the given anchor.
     * @param {string} anchor
     */
    useRouterGoToAnchor(anchor) {
        throwError("useRouterGoToAnchor is not implemented");
    }

    /**
     * Attach a listener that watches the actions of pushing and replacing route states
     */
    useRouterNavigationListener() {
        throwError("useRouterNavigationListener is not implemented");
    }

    /**
     * Get the current route
     */
    useRouterGetRoute() {
        throwError("useRouterGetRoute is not implemented");
    }

    /**
     * Executed when the router has been initialized in the App.
     */
    useRouterOnLoad() {
        throwError("useRouterOnLoad is not implemented");
    }

    /**
     * Change the tab title of the browser.
     */
    useRouterSetTitle(title) {
        throwError("useRouterSetTitle is not implemented");
    }
}

export default RecursiveRouter;
