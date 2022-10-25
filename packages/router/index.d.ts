import { RecursiveElement, Route, RouteTemplate, StateArray } from "../../lib";
import { RecursiveApp } from "../app";
import { RecursiveOrchestrator } from "../orchestrator";
import { RecursiveState } from "../state";
import { createRoute } from "./route";

export { createRoute };

interface RouterContext {
    context: object;
    stack: Array<object>;
    depth: number;
    fragments: Array<string>;
    anchor: string;
}

/**
 * Blueprint of a ``Recursive Router``.
 *
 * Manage App routing.
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
export abstract class RecursiveRouter {
    public base: string;
    public scroll: boolean;
    public routes: Array<Route>;
    public routerContext: RouterContext;
    public bootstrapper: RecursiveApp;

    get stateManager(): RecursiveState;
    get orchestrator(): RecursiveOrchestrator;

    /**
     * create an instance of the Recursive Router
     * @param route route  tree.
     * @param base application basename.
     * @param scroll boolean indicating if the application should correct the current scrolling when a new route is mounted.
     * @param bootstrapper the bootstrapping recursive application module
     */
    constructor(route: Route, base: string, scroll: boolean, bootstrapper: RecursiveApp);

    /**
     * return the current path state.
     */
    getPathState(): StateArray<string>;

    /**
     * return the current route object state.
     */
    getRouteState(): StateArray<RouteTemplate>;

    /**
     * used to navigate between routes.
     * @param path destination route path.
     */
    goTo(path: string): void;

    /**
     * replace the current route with the given one.
     * @param path destination path.
     * @param hash destination hash.
     */
    replace(path: string, hash: string): void;

    /**
     * Return the parameters of the current route.
     */
    getParams(): object;

    /**
     * return the component matching the current route context.
     */
    renderFragment(): RecursiveElement;

    /**
     * combine `useRouterContext` and `renderFragment`,
     * render the route fragment to the tree.
     */
    renderRoute(): RecursiveElement;

    /**
     * Resolve destination path,
     * @param path destination path.
     */
    resolvePath(path: string): [string, RouteTemplate, string];

    /**
     * return the currently targeted anchor.
     */
    getAnchor(): string;

    /**
     * determine if the current route is a sub route of the given one.
     * @param route parent route.
     */
    isWithinRoute(route: string): boolean;

    /**
     * mount the route with the given parameters.
     * @param path destination path.
     * @param route route template.
     * @param anchor destination anchor/hash
     */
    mountNewRoute(path: string, route: RouteTemplate, anchor: string): void;

    /**
     * build the URL from the given path.
     * @param path path.
     */
    abstract useRouterMakeURL(path: string): string;

    /**
     * retrieve the currently loaded path in the native platform.
     */
    abstract useRouterGetLocationPath(): string;

    /**
     * replace the current route state.
     * @param destination destination path.
     * @param routeForm destination path form (route form is not the same as the destination in case of a dynamic route).
     * @param hash
     */
    abstract useRouterReplaceState(destination: string, routeForm: string, hash: string): void;

    /**
     * push a new route state.
     * @param destination destination path.
     * @param routeForm destination path form (route form is not the same as the destination in case of a dynamic route).
     * @param hash
     */
    abstract useRouterPushState(destination: string, routeForm: string, hash: string): void;

    /**
     * scroll to the top of the device view.
     */
    abstract useRouterScrollToTop(): void;

    /**
     * scroll to the location of the element identified by the given anchor.
     * @param anchor target anchor.
     */
    abstract useRouterGoToAnchor(anchor: string): void;

    /**
     * attach a listener that watches the actions of pushing and replacing route states.
     */
    abstract useRouterNavigationListener(): void;

    /**
     * Get the current route from the native platform.
     */
    abstract useRouterGetRoute(): string;

    /**
     * execute when the app has been initialized.
     */
    abstract useRouterOnLoad(): void;

    /**
     * update the current title.
     * @param title new title
     */
    abstract useRouterSetTitle(title: string): void;
}
